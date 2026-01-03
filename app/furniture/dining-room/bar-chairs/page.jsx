import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bar Chairs',
};

export default async function BarchairsPage() {
  const { products, categoryId } = await getProducts('bar-chairs', ['bar-chairs'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Bar Chairs" />
}

