import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Coffe Table',
};

export default async function CoffeeTablePage() {
  const { products, categoryId } = await getProducts('coffee-table', ['coffee-table'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Coffe Table" />
}

