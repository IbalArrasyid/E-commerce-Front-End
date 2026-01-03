import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ottoman Pouf',
};

export default async function OttomanPoufPage() {
  const { products, categoryId } = await getProducts('ottoman-pouf', ['ottoman-pouf'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Ottoman Pouf" />
}

