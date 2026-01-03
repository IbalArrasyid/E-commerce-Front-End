import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trolleys Bar Carts',
};

export default async function TrolleysBarCartsPage() {
  const { products, categoryId } = await getProducts('trolleys-bar-carts', ['trolleys-bar-carts'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Trolleys Bar Carts" />
}

