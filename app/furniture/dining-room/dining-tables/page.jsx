import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dining Tables',
};

export default async function DiningTablesPage() {
  const { products, categoryId } = await getProducts('dining-tables', ['dining-tables'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Dining Tables" />
}

