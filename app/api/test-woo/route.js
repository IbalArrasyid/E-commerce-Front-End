export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET() {
  console.log('=== Testing WooCommerce Connection ===');
  
  // Check environment variables
  const envCheck = {
    NEXT_PUBLIC_WC_STORE_URL: !!process.env.NEXT_PUBLIC_WC_STORE_URL,
    WC_READ_KEY: !!process.env.WC_READ_KEY,
    WC_READ_SECRET: !!process.env.WC_READ_SECRET
  };

  console.log('Environment variables present:', envCheck);
  console.log('Store URL:', process.env.NEXT_PUBLIC_WC_STORE_URL);

  // Check for missing env variables
  const missing = Object.entries(envCheck)
    .filter(([_, exists]) => !exists)
    .map(([key]) => key);

  if (missing.length > 0) {
    return NextResponse.json({
      success: false,
      error: 'Missing environment variables',
      missing: missing,
      envCheck
    }, { status: 500 });
  }

  // Test connection
  try {
    const api = createWooClientRead();
    console.log('WooCommerce client created');
    
    const { data } = await api.get('products', { per_page: 1 });
    console.log('Test product fetch successful');
    
    return NextResponse.json({
      success: true,
      message: 'WooCommerce connection successful',
      productCount: data.length,
      sampleProduct: data[0] ? {
        id: data[0].id,
        name: data[0].name,
        price: data[0].price
      } : null
    });
  } catch (error) {
    console.error('WooCommerce connection test failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.response?.data,
      statusCode: error.response?.status
    }, { status: 500 });
  }
}