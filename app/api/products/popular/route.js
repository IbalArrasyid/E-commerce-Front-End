export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET(request) {
  try {
    console.log('=== Popular Products API Called ===');
    
    // Initialize WooCommerce client
    const api = createWooClientRead();
    console.log('✅ WooCommerce client created');

    const { searchParams } = new URL(request.url);
    console.log('📝 Search params:', Object.fromEntries(searchParams));

    // Build query parameters for WooCommerce API
    const params = {
      orderby: searchParams.get('orderby') || 'popularity',
      order: searchParams.get('order') || 'desc',
      per_page: parseInt(searchParams.get('per_page') || '12'),
      status: 'publish'
    };

    // Handle category/categories parameter
    const categories = searchParams.get('categories');
    const category = searchParams.get('category');
    
    if (categories) {
      // Multiple categories (comma-separated)
      console.log('🏷️  Categories param:', categories);
      params.category = categories;
    } else if (category) {
      // Single category
      console.log('🏷️  Category param:', category);
      params.category = category;
    }

    // Optional filters
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const search = searchParams.get('search');
    
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (search) params.search = search;

    console.log('🔍 Final WooCommerce params:', params);

    // Fetch products from WooCommerce
    const response = await api.get('products', params);
    
    console.log('✅ Products fetched:', response.data?.length || 0, 'items');

    // Validate response
    if (!response || !response.data) {
      console.error('❌ Invalid response structure');
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid response from WooCommerce API',
          params: params
        }, 
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: response.data,
      count: response.data.length,
      params: params
    });

  } catch (error) {
    console.error('❌ Error in popular products API:');
    console.error('   Message:', error.message);
    console.error('   Status:', error.response?.status);
    console.error('   Response:', error.response?.data);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to fetch products',
        details: error.response?.data || null,
        statusCode: error.response?.status || 500
      }, 
      { status: error.response?.status || 500 }
    );
  }
}