import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Chest of Drawers and Dressers',
};

export default async function ChestOfDrawersPage() {
  const { products, categoryId } = await getProducts('chest-of-drawers-and-dressers', ['chest-of-drawers-and-dressers'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Chest of Drawers and Dressers" />
}

