import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Chests',
};

export default async function ChestsPage() {
  const { products, categoryId } = await getProducts('chests', ['chests'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Chests" />
}

