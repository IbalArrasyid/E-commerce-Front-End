import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sofa',
};

export default async function SideTablePage() {
  const { products, categoryId } = await getProducts('sofa', ['sofa'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Sofa" />
}

