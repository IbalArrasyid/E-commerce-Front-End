import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dining Chairs',
};

export default async function DiningchairsPage() {
  const { products, categoryId } = await getProducts('dining-chairs', ['dining-chairs'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Dining Chairs" />
}

