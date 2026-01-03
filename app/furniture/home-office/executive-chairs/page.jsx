import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Executive Chairs',
};

export default async function ExecutiveChairsPage() {
  const { products, categoryId } = await getProducts('executive-chairs', ['executive-chairs'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Executive Chairs" />
}

