import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sectional Corner Sofa',
};

export default async function SideTablePage() {
  const { products, categoryId } = await getProducts('sectional-corner-sofas', ['sectional-corner-sofas'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Sectional Corner Sofa" />
}

