// app/api/categories/route.js
// API endpoint untuk mendapatkan semua kategori dan ID-nya

export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import { createWooClientRead } from "@/lib/woocommerce";

export async function GET(request) {
  try {
    console.log('=== Get Categories API Called ===');
    
    const api = createWooClientRead();
    const { searchParams } = new URL(request.url);

    const params = {
      per_page: 100, 
      orderby: 'name',
      order: 'asc'
    };

    // Filter by parent if provided (untuk subcategories)
    const parent = searchParams.get('parent');
    if (parent) {
      params.parent = parent;
    }

    // Filter by slug if provided
    const slug = searchParams.get('slug');
    if (slug) {
      params.slug = slug;
    }

    console.log('Fetching categories with params:', params);

    const response = await api.get('products/categories', params);
    console.log('Categories fetched successfully:', response.data?.length || 0);

    // Transform response for easier use
    const categories = response.data.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      parent: cat.parent,
      count: cat.count,
      image: cat.image?.src || null
    }));

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        details: error.response?.data || null
      }, 
      { status: error.response?.status || 500 }
    );
  }
}

// How to use:
// 1. Get semua kategori: GET /api/categories
// 2. Get kategori by slug: GET /api/categories?slug=beds
// 3. Get subcategories: GET /api/categories?parent=15