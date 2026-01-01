"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Clock, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function CheckoutFinishPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [pollCount, setPollCount] = useState(0);
  const pollIntervalRef = useRef(null);

  // Maximum number of polls before giving up
  const MAX_POLLS = 3; 
  const POLL_INTERVAL = 2000; // 2 seconds

  /**
   * Fetch order status from WooCommerce API
   * This polls WooCommerce to get the actual payment status
   * after the DOKU plugin has processed the callback
   */
  const fetchOrderStatus = async (orderId) => {
    try {
      console.log(`🔍 Polling order #${orderId} status...`);

      const response = await fetch('/api/orders/fetch-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch order status');
      }

      const data = await response.json();
      console.log(`✅ Order #${orderId} status:`, data.status);

      return data;

    } catch (err) {
      console.error('❌ Error fetching order status:', err);
      throw err;
    }
  };

  useEffect(() => {
    // Get order ID from sessionStorage or URL params
    const orderId = sessionStorage.getItem('pendingOrderId') || searchParams.get('order_id');

    if (!orderId) {
      console.error('❌ No order ID found');
      setLoading(false);
      setError('Order ID tidak ditemukan');
      setPaymentStatus('error');
      return;
    }

    console.log('🔍 Processing order:', orderId);

    /**
     * Poll WooCommerce API for order status
     * The DOKU plugin handles the callback and updates the order status in WooCommerce
     * We poll WooCommerce to get the updated status
     */
    const pollOrderStatus = async () => {
      try {
        const data = await fetchOrderStatus(orderId);

        if (data.success) {
          const { status, order } = data;

          // Update order details
          setOrderDetails({
            orderId: order.id,
            invoiceNumber: searchParams.get('invoice_number') || order.id,
            paymentMethod: order.payment_method_title || 'DOKU Payment Gateway',
            total: order.total,
            currency: order.currency,
            status: order.status
          });

          // Check if payment is complete
          if (status === 'SUCCESS') {
            setPaymentStatus('success');
            setLoading(false);
            clearPolling();
            // Clear sessionStorage
            sessionStorage.removeItem('pendingOrderId');
            sessionStorage.removeItem('pendingInvoiceNumber');
            return;
          }

          // Check if payment failed
          if (status === 'FAILED' || status === 'REFUNDED') {
            setPaymentStatus('failed');
            setError(status === 'REFUNDED' ? 'Payment has been refunded' : 'Payment failed');
            setLoading(false);
            clearPolling();
            sessionStorage.removeItem('pendingOrderId');
            sessionStorage.removeItem('pendingInvoiceNumber');
            return;
          }

          // If still pending, continue polling
          setPollCount(prev => {
            const newCount = prev + 1;

            if (newCount >= MAX_POLLS) {
              // Max polls reached, show pending with manual refresh option
              setPaymentStatus('pending');
              setLoading(false);
              clearPolling();
              return newCount;
            }

            return newCount;
          });

        } else {
          throw new Error(data.error || 'Failed to fetch order status');
        }

      } catch (err) {
        console.error('❌ Polling error:', err);
        // Continue polling on error, don't give up immediately
        setPollCount(prev => {
          const newCount = prev + 1;
          if (newCount >= MAX_POLLS) {
            setPaymentStatus('error');
            setError(err.message);
            setLoading(false);
            clearPolling();
          }
          return newCount;
        });
      }
    };

    // Start polling
    pollOrderStatus();
    pollIntervalRef.current = setInterval(pollOrderStatus, POLL_INTERVAL);

    // Cleanup
    const clearPolling = () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };

    return () => clearPolling();
  }, [searchParams]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="w-20 h-20 text-green-500" />;
      case 'failed':
      case 'error':
        return <XCircle className="w-20 h-20 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="w-20 h-20 text-yellow-500" />;
    }
  };

  const getStatusTitle = () => {
    switch (paymentStatus) {
      case 'success':
        return 'Payment Success!';
      case 'failed':
        return 'Payment Failed';
      case 'error':
        return 'An Error Occurred';
      case 'pending':
        return 'Waiting for Payment';
      default:
        return 'Processing Payment...';
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return 'Thank you! Your order has been successfully paid and will be processed shortly.';
      case 'failed':
        return 'Sorry, your payment failed. Please try again or contact customer service.';
      case 'error':
        return error || 'An error occurred while processing your payment.';
      case 'pending':
        return 'Your payment is being processed. The page will update automatically.';
      default:
        return `Processing payment status... (${pollCount}/${MAX_POLLS})`;
    }
  };

  const getActionButtons = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <>
            <Link
              href="/"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link
              href="/my-account?tab=orders"
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              View My Orders
            </Link>
          </>
        );
      case 'failed':
      case 'error':
        return (
          <>
            <button
              onClick={() => {
                setPollCount(0);
                setLoading(true);
                setPaymentStatus('processing');
                const orderId = sessionStorage.getItem('pendingOrderId') || searchParams.get('order_id');
                if (orderId) {
                  fetchOrderStatus(orderId);
                }
              }}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
             <Link
              href="/cart"
              className="w-auto border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              Back to Cart
            </Link>
          </>
        );
      case 'pending':
        return (
          <>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Update Status Payment
            </button>
            <Link
              href="/my-account?tab=orders"
              className="w-auto border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              View My Orders
            </Link>

          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-light mb-2">Processing Payment</h2>
          <p className="text-gray-600">Please wait a moment... ({pollCount}/{MAX_POLLS})</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>

          {/* Status Title */}
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {getStatusTitle()}
          </h1>

          {/* Status Message */}
          <p className="text-gray-600 mb-6 text-lg">
            {getStatusMessage()}
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-lg mb-3">Detail Pesanan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Pesanan:</span>
                  <span className="font-medium">#{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span className="font-medium">{orderDetails.paymentMethod}</span>
                </div>
                {orderDetails.total && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">
                      {orderDetails.currency === 'IDR' ? 'Rp ' : ''}{orderDetails.total}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${paymentStatus === 'success' ? 'text-green-600' :
                      paymentStatus === 'failed' ? 'text-red-600' :
                        'text-yellow-600'
                    }`}>
                    {orderDetails.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {getActionButtons()}
          </div>

          {/* Help Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Need help? Contact us:
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                WhatsApp
              </a>
              <a
                href="mailto:support@homedecorindonesia.com"
                className="text-blue-600 hover:text-blue-700"
              >
                Email
              </a>
              <a
                href="tel:+6281234567890"
                className="text-gray-600 hover:text-gray-700"
              >
                Phone
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}