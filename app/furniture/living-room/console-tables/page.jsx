import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Console Tables',
};

export default async function ConsoleTablePage() {
  const { products, categoryId } = await getProducts('console-tables', ['console-tables'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Console Tables" />
}

