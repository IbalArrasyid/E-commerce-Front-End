"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { Shield, Truck, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import CheckoutStepper from "@/components/Checkout/CheckoutStepper";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotals, getShippingCost, clearCart } = useCart();
  const { getToken, user, isLoading: authLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [cartReady, setCartReady] = useState(false);

  // Checkout Steps State: 1 = Information, 2 = Payment
  const [currentStep, setCurrentStep] = useState(1);

  // Redirect state
  const [redirecting, setRedirecting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const cartTotals = getCartTotals();
  const shippingCost = getShippingCost();
  const totalAmount = cartTotals.subtotal + shippingCost;

  // Mark cart as ready after hydration
  useEffect(() => {
    setCartReady(true);
  }, []);

  useEffect(() => {
  if (!authLoading && !user) {
    router.push('/my-account');
  }
  }, [authLoading, user, router]);

  // Redirect to cart if empty
  useEffect(() => {
    if (!cartReady) return;
    if (cartItems.length === 0 && !redirecting) {
      router.push('/cart');
    }
  }, [cartReady, cartItems.length, redirecting, router]);

  // Handle redirect to payment page
  useEffect(() => {
    if (paymentUrl && redirecting) {
      // Store order ID in sessionStorage for callback handling
      if (orderData?.orderId) {
        sessionStorage.setItem('pendingOrderId', orderData.orderId);
        sessionStorage.setItem('pendingInvoiceNumber', orderData.invoiceNumber);
      }

      // Full page redirect to DOKU hosted checkout
      window.location.href = paymentUrl;
    }
  }, [paymentUrl, redirecting, orderData]);

  // Handler to move between steps
  const handleStepChange = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Logic Utama Submit Order
  const handleOrderSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // A. Ambil Token
      const token = getToken();

      // B. Siapkan Payload sesuai yang dibutuhkan API
      const payload = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),

        customer: {
          billing: {
            first_name: formData.firstName || '',
            last_name: formData.lastName || '',
            email: formData.email || '',
            phone: formData.phone || '',
            address_1: formData.billingAddress.street || '',
            city: formData.billingAddress.city || '',
            state: formData.billingAddress.province || '',
            postcode: formData.billingAddress.postalCode || '',
            country: formData.billingAddress.country || 'Indonesia'
          },
          shipping: formData.shippingSameAsBilling ?
            {
              first_name: formData.firstName || '',
              last_name: formData.lastName || '',
              email: formData.email || '',
              phone: formData.phone || '',
              address_1: formData.billingAddress.street || '',
              city: formData.billingAddress.city || '',
              state: formData.billingAddress.province || '',
              postcode: formData.billingAddress.postalCode || '',
              country: formData.billingAddress.country || 'Indonesia'
            } : {
              first_name: formData.firstName || '',
              last_name: formData.lastName || '',
              email: formData.email || '',
              phone: formData.phone || '',
              address_1: formData.shippingAddress.street || '',
              city: formData.shippingAddress.city || '',
              state: formData.shippingAddress.province || '',
              postcode: formData.shippingAddress.postalCode || '',
              country: formData.shippingAddress.country || 'Indonesia'
            }
        },

        paymentMethod: formData.paymentMethod || 'doku',
        dokuPaymentMethod: formData.dokuPaymentMethod || 'VIRTUAL_ACCOUNT',
        dokuPaymentType: formData.dokuPaymentType || 'BCA',

        shippingCost: shippingCost,
        orderNotes: formData.orderNotes || ''
      };

      console.log("📤 Submitting Order Payload:", payload);

      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to place order');
      }

      console.log("✅ Order Created:", result);

      if (result.success && result.redirect_url) {
        console.log("💳 Payment URL received:", result.redirect_url);

        clearCart();

        setOrderData({
          orderId: result.order_id
        });

        setPaymentUrl(result.redirect_url);
        setRedirecting(true);

      } else {
        throw new Error("Redirect URL not found in response");
      }


    } catch (error) {
      console.error("❌ Checkout Error:", error);
      alert(`Checkout Failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

    // --- JSX return ---
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }


  // Tampilan Cart Kosong
  if (cartReady && cartItems.length === 0 && !redirecting) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-light mb-2">Your cart is empty</h2>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Tampilan Redirect - Menunggu redirect ke DOKU
  if (redirecting) {
    return (
      <>
        <CheckoutStepper currentStep={3} />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto p-8"
          >
            <div className="w-20 h-20 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-6"></div>

            <h1 className="text-3xl font-light mb-4">
              Redirecting to Payment...
            </h1>

            <p className="text-gray-600 mb-6">
              You will be redirected to the secure payment page in a moment...
            </p>

            {orderData && (
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <p className="text-sm text-gray-600">Order ID: {orderData.orderId}</p>
                <p className="text-sm text-gray-600">Invoice: {orderData.invoiceNumber}</p>
              </div>
            )}

            <p className="text-sm text-gray-500 mt-4">
              If you are not redirected automatically,{' '}
              <button
                onClick={() => window.location.href = paymentUrl}
                className="text-black underline hover:text-gray-700"
              >
                click here
              </button>
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-light">Checkout</h1>
              <Link href="/" className="text-sm text-gray-500 hover:text-black">
                Back to Store
              </Link>
            </div>
            {/* Stepper */}
            <CheckoutStepper currentStep={currentStep} />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-blue-600" />
                <span>Free Shipping over 500k</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-purple-600" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm
                onSubmit={handleOrderSubmit}
                isLoading={isLoading}
                cartItems={cartItems}
                cartTotals={cartTotals}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
                initialData={user ? {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phone: user.phone
                } : null}
                currentStep={currentStep}
                onStepChange={handleStepChange}
              />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                {cartReady ? (
                  <OrderSummary
                    items={cartItems}
                    totals={cartTotals}
                    shippingCost={shippingCost}
                    totalAmount={totalAmount}
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
                    <div className="bg-gray-50 px-6 py-4 border-b h-20" />
                    <div className="p-4 space-y-4">
                      <div className="h-20 bg-gray-100 rounded" />
                      <div className="h-20 bg-gray-100 rounded" />
                    </div>
                    <div className="p-6 bg-gray-50 border-t space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-6 bg-gray-300 rounded mt-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}