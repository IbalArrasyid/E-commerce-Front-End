import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bench',
};

export default async function BenchPage() {
  const { products, categoryId } = await getProducts('bench', ['bench'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Bench" />
}

