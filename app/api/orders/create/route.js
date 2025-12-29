export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientWrite, createWooClientRead } from "@/lib/woocommerce";
import { getProductById } from "@/services/server-helpers"; // Get product prices

// --- HELPER FUNCTIONS ---

// Generate unique order number for WooCommerce

function generateOrderNumber() {
  const date = new Date();
  const dateStr = date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${dateStr}-${randomNum}`;
}

// Calculate totals from cart items

async function calculateTotals(items, shippingCost = 0) {
  let subtotal = 0;

  for (const item of items) {
    try {
      // Get real product price from database
      const product = await getProductById(item.product_id);
      const price = product ? parseFloat(product.price) : 250000; // Default fallback

      console.log(`💰 Product ${item.product_id}: name=${product?.name || 'Unknown'}, price=${price}, qty=${item.quantity}`);

      subtotal += (price * item.quantity);
    } catch (error) {
      console.error(`❌ Error getting price for product ${item.product_id}:`, error);
      subtotal += (250000 * item.quantity); // Default fallback
    }
  }

  const total = subtotal + shippingCost;

  console.log(`💰 Total Calculation: subtotal=${subtotal}, shipping=${shippingCost}, total=${total}`);

  return { subtotal, shippingCost, total, currency: 'IDR' };
}

//Validate order data
function validateOrderData(orderData) {
  const errors = [];

  // Extract customer data dari structure baru
  const firstName = orderData.customer?.billing?.first_name || orderData.firstName;
  const email = orderData.customer?.billing?.email || orderData.email;

  if (!firstName?.trim()) errors.push('First name is required');
  if (!email?.trim()) errors.push('Email is required');
  if (!orderData.items || orderData.items.length === 0) errors.push('No items in order');

  console.log('🔍 Validation Debug:', {
    firstName,
    email,
    itemsCount: orderData.items?.length || 0,
    customerStructure: !!orderData.customer
  });

  return { isValid: errors.length === 0, errors };
}

// Get payment method title for WooCommerce
function getPaymentMethodTitle(orderData) {
  if (orderData.paymentMethod === 'doku') {
    return `Doku - ${orderData.paymentMethodType || 'Virtual Account'}`;
  }
  return orderData.paymentMethod;
}

// MAIN API ROUTE 

export async function POST(request) {
  try {
    const orderData = await request.json();

    console.log('=== WOOCOMMERCE ORDER CREATION START ===');
    console.log('📥 Received Payload:', JSON.stringify(orderData, null, 2));

    // 1. Validate Input
    const validation = validateOrderData(orderData);
    if (!validation.isValid) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: validation.errors }, { status: 400 });
    }

    // 2. Calculate Totals (now async)
    const totals = await calculateTotals(orderData.items, orderData.shippingCost || 0);

    // 3. AUTHENTICATION LOGIC (NEW) (Check if User Login (has JWT Token)
    let customerId = 0; // Default Guest
    const authHeader = request.headers.get('authorization');

    if (authHeader) {
      console.log('🔐 Auth token detected, validating user...');
      try {
        const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
        // Validasi token ke WordPress
        const userRes = await fetch(`${wpUrl}/wp-json/wp/v2/users/me`, {
          headers: { 'Authorization': authHeader }
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          customerId = userData.id; // Set ID Customer Asli
          console.log(`✅ User identified: ID ${customerId} (${userData.name})`);
        } else {
          console.warn('⚠️ Token invalid or expired, proceeding as Guest.');
        }
      } catch (e) {
        console.error('⚠️ Auth check error:', e.message);
      }
    }

    // 4. Prepare WooCommerce Order Data
    const api = createWooClientWrite();
    if (!api) throw new Error('WooCommerce API not configured');

    const orderNumber = generateOrderNumber();

    // Extract customer data dari structure baru (prioritas ke customer.billing)
    const billingData = orderData.customer?.billing || {};
    const shippingData = orderData.customer?.shipping || billingData;

    const wooOrder = {
      status: 'pending',
      currency: 'IDR',
      customer_id: customerId, // Menggunakan ID yang sudah dideteksi
      billing: {
        first_name: billingData.first_name || orderData.firstName || '',
        last_name: billingData.last_name || orderData.lastName || '',
        email: billingData.email || orderData.email || '',
        phone: billingData.phone || orderData.phone || '',
        address_1: billingData.address_1 || '',
        city: billingData.city || '',
        state: billingData.state || '',
        postcode: billingData.postcode || billingData.postalCode || '',
        country: billingData.country || 'ID'
      },
      shipping: {
        first_name: shippingData.first_name || billingData.first_name || orderData.firstName || '',
        last_name: shippingData.last_name || billingData.last_name || orderData.lastName || '',
        address_1: shippingData.address_1 || '',
        city: shippingData.city || '',
        state: shippingData.state || '',
        postcode: shippingData.postcode || shippingData.postalCode || '',
        country: shippingData.country || 'ID'
      },
      line_items: orderData.items.map((item, index) => {
        const mappedItem = {
          product_id: item.product_id || item.id,
          quantity: item.quantity,
          price: parseFloat(item.sale_price || item.price || 0)
        };

        console.log(`🛍️ Item ${index + 1}:`, {
          original: item,
          mapped: mappedItem
        });

        return mappedItem;
      }),
      shipping_lines: [{
        method_id: 'flat_rate',
        method_title: 'Flat Rate Shipping',
        total: totals.shippingCost.toString()
      }],
      payment_method: orderData.paymentMethod,
      payment_method_title: getPaymentMethodTitle(orderData),
      customer_note: orderData.orderNotes || '',
      meta_data: [
        { key: '_order_number', value: orderNumber },
        { key: '_order_total', value: totals.total.toString() },
        { key: '_doku_payment_type', value: orderData.paymentMethodType || '' }
      ]
    };

    // 5. Create Order in WooCommerce
    console.log('📦 Creating order in WooCommerce...');
    const wooRes = await api.post('orders', wooOrder);

    if (!wooRes.data) throw new Error('WooCommerce API returned no data');
    const createdOrder = wooRes.data;
    console.log(`✅ Order Created: #${createdOrder.id}`);

    // 6. GET PAYMENT URL FROM WOOCOMMERCE DOKU PLUGIN
    // The DOKU JOKUL plugin for WooCommerce provides payment_url and checkout_payment_url
    // We use WooCommerce's built-in payment URL instead of generating our own
    let paymentResponse = { paymentUrl: null };

    if (orderData.paymentMethod === 'doku') {
      console.log('💳 Getting DOKU payment URL from WooCommerce plugin...');

      // Priority: payment_url (from plugin) > checkout_payment_url (WooCommerce default)
      const paymentUrl = createdOrder.payment_url || createdOrder.checkout_payment_url;

      if (paymentUrl) {
        console.log('✅ DOKU Payment URL from WooCommerce:', paymentUrl);
        paymentResponse = {
          paymentUrl: paymentUrl,
          orderId: createdOrder.id.toString(),
          invoiceNumber: orderNumber
        };
      } else {
        // If no payment URL, fetch the order again to get updated URLs
        console.log('⚠️ No payment URL in response, fetching order...');
        try {
          const apiRead = createWooClientRead();
          if (apiRead) {
            const orderRes = await apiRead.get(`orders/${createdOrder.id}`);
            const updatedOrder = orderRes.data;
            const fallbackUrl = updatedOrder.payment_url || updatedOrder.checkout_payment_url;

            if (fallbackUrl) {
              console.log('✅ DOKU Payment URL from fetch:', fallbackUrl);
              paymentResponse = {
                paymentUrl: fallbackUrl,
                orderId: createdOrder.id.toString(),
                invoiceNumber: orderNumber
              };
            }
          }
        } catch (fetchError) {
          console.error('❌ Error fetching order payment URL:', fetchError.message);
        }

        if (!paymentResponse.paymentUrl) {
          throw new Error('Payment URL not available. Please ensure DOKU plugin is configured in WooCommerce.');
        }
      }
    }

    // 7. Return Final Response
    console.log('📤 Final Response:', {
      success: true,
      order_id: createdOrder.id,
      invoice_number: orderNumber,
      payment: paymentResponse
    });

    return NextResponse.json({
      success: true,
      order_id: createdOrder.id,
      invoice_number: orderNumber,
      payment: paymentResponse
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Order Creation Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'active' });
}