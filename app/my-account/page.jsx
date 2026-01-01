'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  MapPin, 
  User, 
  LogOut,
  Search,
  Package,
  CreditCard,
  ArrowRightLeft 
} from 'lucide-react';

export default function MyAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser
  } = useAuth();


  const fetchOrders = async () => {
  try {
    setLoadingOrders(true);

    const token = localStorage.getItem("homedecor_token");
    if (!token) {
      console.error("NO TOKEN IN LOCALSTORAGE");
      return;
    }

    const res = await fetch("/api/orders/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();
    setOrders(data.orders || []);
    setSelectedOrder(data.orders?.[0] || null);

  } catch (err) {
    console.error("Fetch orders failed:", err);
  } finally {
    setLoadingOrders(false);
  }
};


  // State untuk Tab Navigasi Dashboard
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.replace(`/my-account?tab=${tab}`, { scroll: false });
  };


  // ORDERS STATE
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const dokuInvoice =
      order.meta_data?.find(md => md.key === 'doku_invoice')?.value || '';

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      order.number?.toString().includes(search) ||
      dokuInvoice.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastOrder = currentPage * 3;
  const indexOfFirstOrder = indexOfLastOrder - 3;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / 3);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);



  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Waiting for Payment';
      case 'processing': return 'Processing';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };
  
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);


  // State untuk Form Login/Register
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    reg_password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState({
  type: '', // 'success' | 'error'
  text: ''
  });


  const redirectTo = searchParams.get('redirectTo');

  // --- LOGIC AUTH (Login/Register) ---
  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(
      formData.username,
      formData.password
    );

    if (!result.success) {
      setError(result.error || 'Login failed');
    }

    setIsSubmitting(false);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await register({
      email: formData.email,
      password: formData.reg_password,
    });

    if (!result.success) {
      setError(result.error || 'Registration failed');
    }

    setIsSubmitting(false);
  };


  const handleLogout = () => {
    if (logout) logout();
    window.location.href = '/my-account'; 
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      displayName: formData.get('displayName'),
    };

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
      await refreshUser();
      setMessage({
        type: 'success',
        text: 'Account details updated successfully.'
      });
    } else {
      setMessage({
        type: 'error',
        text: data.error || 'Failed to update profile.'
      });
    }

    } catch (err) {
      setError('Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // --- RENDER LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  // --- RENDER DASHBOARD (JIKA SUDAH LOGIN) ---
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-normal text-black mb-10">My account</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR NAVIGATION */}
            <nav className="w-full lg:w-1/4 border-r border-gray-100 pr-0 lg:pr-8">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => handleTabChange('dashboard')}
                    className={`w-full text-left py-3 px-0 flex items-center justify-between group ${activeTab === 'dashboard' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <span>Dashboard</span>
                    <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-black' : 'text-gray-300'} />
                  </button>
                  <hr className="border-gray-100" />
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange('orders')}
                    className={`w-full text-left py-3 px-0 flex items-center justify-between group ${activeTab === 'orders' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <span>Orders</span>
                    <ShoppingBag size={18} className={activeTab === 'orders' ? 'text-black' : 'text-gray-300'} />
                  </button>
                  <hr className="border-gray-100" />
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange('downloads')}
                    className={`w-full text-left py-3 px-0 flex items-center justify-between group ${activeTab === 'downloads' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <span>Downloads</span>
                    <FileText size={18} className={activeTab === 'downloads' ? 'text-black' : 'text-gray-300'} />
                  </button>
                  <hr className="border-gray-100" />
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange('address')}
                    className={`w-full text-left py-3 px-0 flex items-center justify-between group ${activeTab === 'address' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <span>Address</span>
                    <MapPin size={18} className={activeTab === 'address' ? 'text-black' : 'text-gray-300'} />
                  </button>
                  <hr className="border-gray-100" />
                </li>
                <li>
                  <button
                    onClick={() => handleTabChange('account-details')}
                    className={`w-full text-left py-3 px-0 flex items-center justify-between group ${activeTab === 'account-details' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <span>Account details</span>
                    <User size={18} className={activeTab === 'account-details' ? 'text-black' : 'text-gray-300'} />
                  </button>
                  <hr className="border-gray-100" />
                </li>
                {/* <li>
                  <button
                    onClick={() => handleTabChange('compare')}
                    className={`w-full text-left py-3 px-0 flex items-center justify-between group ${activeTab === 'compare' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                  >
                    <span>Compare</span>
                    <ArrowRightLeft size={18} className={activeTab === 'compare' ? 'text-black' : 'text-gray-300'} />
                  </button>
                  <hr className="border-gray-100" />
                </li> */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-3 px-0 flex items-center justify-between text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <span>Log out</span>
                    <LogOut size={18} className="text-gray-300 group-hover:text-red-600" />
                  </button>
                  <hr className="border-gray-100" />
                </li>
              </ul>
            </nav>

            {/* MAIN CONTENT AREA */}
            <main className="w-full lg:w-3/4 pl-0 lg:pl-8">
              
              {/* DASHBOARD CONTENT */}
              {activeTab === 'dashboard' && (
                <div className="space-y-4">
                  <p className="text-gray-800">
                    Hello <span className="font-semibold text-black">{user?.username || user?.email?.split('@')[0]}</span> (not <span className="font-semibold">{user?.username || user?.email?.split('@')[0]}</span>? <button onClick={handleLogout} className="text-black underline hover:text-gray-600">Log out</button>)
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    From your account dashboard you can view your <button onClick={() => handleTabChange('orders')} className="text-black underline">recent orders</button>, manage your <button onClick={() => handleTabChange('address')} className="text-black underline">billing address</button>, and <button onClick={() => handleTabChange('account-details')} className="text-black underline">edit your account details</button>.
                  </p>
                </div>
              )}

              {/* ORDERS CONTENT (Placeholder) */}
              {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-light mb-4">My Orders</h2>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by order number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="sm:w-48">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Waiting for Payment</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Orders List */}
                {loadingOrders ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <Package className="mx-auto text-gray-400 mb-4" size={64} />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== 'all'
                        ? 'Try adjusting your filters or search terms'
                        : "You haven't placed any orders yet"}
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-medium text-gray-900">
                                Order #{order.number}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Invoice: {order.invoice || '-'}
                            </p>
                          </div>
                          <div className="text-right mt-4 sm:mt-0">
                            <p className="text-lg font-medium text-gray-900">
                              Rp {Number(order.total || 0).toLocaleString('id-ID')}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date_created).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CreditCard size={16} /> {order.payment_method || '-'}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Package size={16} /> {order.line_items?.length || 0} item{order.line_items?.length > 1 ? 's' : ''}
                          </div>
                          <div className="flex gap-2">
                            {order.status === 'pending' && order.payment_url && (
                              <a
                                href={order.payment_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                              >
                                Pay Now
                              </a>
                            )}
                            <button
                              onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </div>

                        {/* ORDER DETAILS */}
                        {selectedOrder?.id === order.id && (
                          <div className="mt-6 border rounded-lg bg-gray-50 overflow-hidden">

                            {/* HEADER */}
                            <div className="px-6 py-4 bg-white border-b">
                              <h4 className="text-lg font-medium text-gray-900">
                                Order #{order.number}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Invoice: {order.invoice || '-'}
                              </p>
                            </div>

                            {/* ITEMS */}
                            <div className="divide-y">
                              {order.line_items.map(item => (
                                <div key={item.id} className="flex gap-4 p-6 bg-white">

                                  {/* IMAGE */}
                                  {item.image?.src ? (
                                    <img
                                      src={item.image.src}
                                      alt={item.name}
                                      className="w-20 h-20 object-cover rounded border"
                                    />
                                  ) : (
                                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                      No Image
                                    </div>
                                  )}

                                  {/* INFO */}
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-600">
                                      Qty: {item.quantity}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Price: Rp {Number(item.price).toLocaleString('id-ID')}
                                    </p>
                                  </div>

                                  {/* TOTAL */}
                                  <div className="text-right font-medium text-gray-900">
                                    Rp {Number(item.total).toLocaleString('id-ID')}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* SUMMARY */}
                            <div className="px-6 py-4 bg-gray-100 text-sm">
                              <div className="flex justify-between mb-2">
                                <span>Payment Method</span>
                                <span className="font-medium">{order.payment_method}</span>
                              </div>

                              <div className="flex justify-between mb-2">
                                <span>Status</span>
                                <span className="font-medium">{getStatusText(order.status)}</span>
                              </div>

                              <div className="flex justify-between border-t pt-2 mt-2 text-base font-semibold">
                                <span>Total</span>
                                <span>
                                  Rp {Number(order.total).toLocaleString('id-ID')}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {filteredOrders.length > 3 && (
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}

                  </div>
                )}
              </div>
            )}

              {/* DOWNLOADS CONTENT (Placeholder) */}
              {activeTab === 'downloads' && (
                <div>
                  <h2 className="text-2xl font-light mb-6">Downloads</h2>
                  <div className="bg-gray-50 p-4 rounded text-center text-gray-500">
                    No downloads available yet.
                  </div>
                </div>
              )}

              {/* ADDRESS CONTENT (Placeholder) */}
              {activeTab === 'address' && (
                <div>
                  <h2 className="text-2xl font-light mb-6">Addresses</h2>
                  <p className="text-gray-600 mb-6">The following addresses will be used on the checkout page by default.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-0">
                      <header className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">Billing address</h3>
                        <a href="my-account/edit-address/" className="text-sm text-red-500 hover:text-black">Edit</a>
                      </header>
                      <address className="not-italic text-gray-600 text-sm">
                        {user?.name}<br/>
                        {user?.email}<br/>
                        You have not set up this type of address yet.
                      </address>
                    </div>
                    {/* Shipping Address block */}
                  </div>
                </div>
              )}

              {/* ACCOUNT DETAILS CONTENT (Placeholder) */}
              {activeTab === 'account-details' && (
                <div className="max-w-xl">
                  <h2 className="text-2xl font-light mb-6">Account Details</h2>

                  {/* ALERT MESSAGE */}
                  {message.text && (
                    <div
                      className={`p-4 mb-6 text-sm ${
                        message.type === 'success'
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  )}
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">First name *</label>
                        <input name="firstName"type="text" defaultValue={user?.firstName || user?.first_name} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Last name *</label>
                        <input name="lastName" type="text" defaultValue={user?.lastName || user?.last_name} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Display name *</label>
                      <input name="displayName" type="text" defaultValue={user?.username || user?.display_name} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" />
                      <span className="text-xs text-gray-500">This will be how your name will be displayed in the account section and in reviews</span>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Email address *</label>
                      <input type="email" defaultValue={user?.email} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-black" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-black text-white px-6 py-3 rounded mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400">
                    {isSubmitting ? 'Saving...' : 'Save changes'}
                    </button>
                  </form>
                </div>
              )}

            </main>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER LOGIN/REGISTER FORM (JIKA BELUM LOGIN) ---
  // Kode ini SAMA PERSIS dengan yang Anda berikan sebelumnya untuk layout 2 kolom
  return (
    <div className="account-page-wrapper">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        .account-page-wrapper {
          font-family: 'Poppins', sans-serif;
          background-color: #fff;
          min-height: 100vh;
          padding: 40px 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        h1.page-title {
          font-size: 32px;
          font-weight: 400;
          color: #000;
          margin-bottom: 40px;
        }

        .u-columns {
          display: flex;
          flex-wrap: wrap;
          gap: 60px; /* Jarak antar kolom */
        }

        .u-column1, .u-column2 {
          flex: 1;
          min-width: 300px;
        }

        .account-box {
          background: #f6f6f6; /* Warna background abu-abu sesuai gambar */
          padding: 40px;
          border-radius: 0; /* Gambar menunjukkan sudut tajam */
        }

        .form-title {
          font-size: 20px;
          font-weight: 400;
          color: #333;
          margin-bottom: 20px;
        }

        .form-row {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: #333;
          line-height: 1.5;
        }

        .required {
          color: #e2401c;
        }

        .input-text {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          background-color: #fff;
          font-size: 14px;
          box-sizing: border-box;
          height: 48px;
        }

        .input-text:focus {
          outline: none;
          border-color: #000;
        }

        .woocommerce-button {
          display: block;
          width: 100%;
          padding: 15px;
          background-color: #000;
          color: #fff;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 10px;
        }

        .woocommerce-button:hover {
          background-color: #333;
        }

        .woocommerce-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Styling untuk Remember Me dan Lost Password */
        .login-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          font-size: 14px;
        }

        .remember-me label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
          font-weight: 400;
          cursor: pointer;
        }

        .lost-password-link {
          color: #000;
          text-decoration: underline;
        }

        .privacy-policy-text {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .privacy-policy-text a {
          color: #000;
          text-decoration: underline;
        }

        .error-message {
          background-color: #fff4f4;
          border-left: 4px solid #cc0000;
          color: #cc0000;
          padding: 12px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        /* Responsiveness untuk Mobile */
        @media (max-width: 768px) {
          .u-columns {
            flex-direction: column;
            gap: 40px;
          }
          
          .account-box {
            padding: 20px;
          }
        }
      `}</style>

      <div className="container">
        <h1 className="page-title">My account</h1>

        {redirectTo && (
          <div className="error-message" style={{borderColor: '#0070e0', backgroundColor: '#eef7ff', color: '#005bb5'}}>
            Please login or register to continue.
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="u-columns" id="customer_login">
          
          {/* KOLOM KIRI: LOGIN */}
          <div className="u-column1">
            <div className="account-box">
              <h2 className="form-title">Login</h2>

              <form method="post" onSubmit={handleLogin}>
                <p className="form-row">
                  <label htmlFor="username">Username or email address <span className="required">*</span></label>
                  <input
                    type="text"
                    className="input-text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    autoComplete="username"
                    required
                  />
                </p>

                <p className="form-row">
                  <label htmlFor="password">Password <span className="required">*</span></label>
                  <input
                    type="password"
                    className="input-text"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    required
                  />
                </p>

                <p className="form-row">
                  <button
                    type="submit"
                    className="woocommerce-button"
                    name="login"
                    value="Log in"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                  </button>
                </p>
              </form>
            </div>
            
            {/* Area Actions dibawah kotak abu-abu (Login only) */}
            <div className="login-actions" style={{padding: '10px 0'}}>
                <div className="remember-me">
                  <label>
                    <input type="checkbox" name="rememberme" id="rememberme" value="forever" />
                    Remember me
                  </label>
                </div>
                <Link href="/my-account/lost-password" className="lost-password-link">
                  Lost your password?
                </Link>
            </div>
          </div>

          {/* KOLOM KANAN: REGISTER */}
          <div className="u-column2">
            <div className="account-box">
              <h2 className="form-title">Register</h2>

              <form method="post" onSubmit={handleRegister}>
                <p className="form-row">
                  <label htmlFor="reg_email">Email address <span className="required">*</span></label>
                  <input
                    type="email"
                    className="input-text"
                    name="email"
                    id="reg_email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                  />
                </p>

                <p className="form-row">
                  <label htmlFor="reg_password">Password <span className="required">*</span></label>
                  <input
                    type="password"
                    className="input-text"
                    name="reg_password"
                    id="reg_password"
                    value={formData.reg_password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                  />
                </p>

                <div className="privacy-policy-text">
                  <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href="/privacy-policy">privacy policy</Link>.</p>
                </div>

                <p className="form-row">
                  <button
                    type="submit"
                    className="woocommerce-button"
                    name="register"
                    value="Register"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}