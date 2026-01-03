import SingleProduct from "@/components/Product/SingleProduct";
import { getProductBySlug, getRelatedProducts } from "@/lib/woocommerce";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { slug } = params;

  try {
    // Fetch product by slug
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    // Fetch related products
    let relatedProducts = [];
    if (product.categories && product.categories.length > 0) {
      const categoryId = product.categories[0].id;
      relatedProducts = await getRelatedProducts(product.id, categoryId, 6);
    }

    return (
      <SingleProduct
        product={product}
        relatedProducts={relatedProducts}
        isLoading={false}
      />
    );
  } catch (error) {
    console.error('Error loading product:', error);

    // Return error state
    return (
      <SingleProduct
        product={null}
        relatedProducts={[]}
        isLoading={false}
      />
    );
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.'
      };
    }

    return {
      title: product.name,
      description: product.short_description || product.description?.substring(0, 160) || `Premium quality ${product.name} from HomeDecor Indonesia`,
      openGraph: {
        title: product.name,
        description: product.short_description || product.description?.substring(0, 160),
        images: product.images?.length > 0 ? [product.images[0].src] : [],
        type: 'website',
        url: `https://www.homedecorindonesia.com/product/${slug}`,
        siteName: 'HomeDecor Indonesia',
        locale: 'en_ID'
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.short_description || product.description?.substring(0, 160),
        images: product.images?.length > 0 ? [product.images[0].src] : []
      },
      alternates: {
        canonical: `https://www.homedecorindonesia.com/product/${slug}`
      },
      // Additional structured data for product
      other: {
        'product:brand': product.attributes?.find(attr => attr.name === 'Brand')?.options?.[0] || 'HomeDecor Indonesia',
        'product:availability': product.stock_status === 'instock' ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:price:amount': product.price,
        'product:price:currency': 'IDR',
        'product:retailer_item_id': product.sku || product.id.toString()
      }
    };
  } catch (error) {
    return {
      title: 'Product',
      description: 'Browse our premium collection of home decor products.'
    };
  }
}