import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Buffet',
};

export default async function BuffetPage() {
  const { products, categoryId } = await getProducts('buffet', ['buffet'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Buffet" />
}

