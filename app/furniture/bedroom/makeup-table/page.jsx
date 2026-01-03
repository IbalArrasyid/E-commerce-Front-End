import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Makeup Table',
};

export default async function MakeUpTablePage() {
  const { products, categoryId } = await getProducts('makeup-table', ['makeup-table'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Makeup Table" />
}

