import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Headboards',
};

export default async function HeadboardsPage() {
  const { products, categoryId } = await getProducts('headboards', ['headboards', 'heads'], 100)

  return <ProductsPage categoryId={categoryId} products={products} category="Headboards" />
}