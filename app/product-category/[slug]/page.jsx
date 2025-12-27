import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/Product/ProductGrid";
import { createWooClientRead } from "@/lib/woocommerce";

export default async function ProductCategoryPage({ params }) {
  const { slug } = params;

  try {
    const api = createWooClientRead();

    // Get category by slug
    const categoryResponse = await api.get('products/categories', { slug });
    if (!categoryResponse.data || categoryResponse.data.length === 0) {
      notFound();
    }
    const category = categoryResponse.data[0];

    // Get products in this category
    const productsResponse = await api.get('products', {
      category: category.id,
      per_page: 12,
      status: 'publish'
    });

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            {category.description && (
              <p className="mt-2 text-gray-600">{category.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {productsResponse.data?.length || 0} products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProductGrid products={productsResponse.data || []} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading category:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const api = createWooClientRead();
    const categoryResponse = await api.get('products/categories', { slug });

    if (!categoryResponse.data || categoryResponse.data.length === 0) {
      return {
        title: 'Category Not Found'
      };
    }

    const category = categoryResponse.data[0];

    return {
      title: `${category.name} - HomeDecor Indonesia`,
      description: category.description || `Browse our ${category.name} collection`,
    };
  } catch (error) {
    return {
      title: 'Category'
    };
  }
}
