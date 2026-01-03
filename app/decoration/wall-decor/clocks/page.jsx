import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Clocks',
};

export default async function ClocksPage() {
  const { products, categoryId } = await getProducts('clocks', ['clocks'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Clocks" />
}

