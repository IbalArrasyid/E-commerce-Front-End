import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Room-Dividers',
};

export default async function RoomDividersPage() {
  const { products, categoryId } = await getProducts('room-dividers', ['room-dividers'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Room-Dividers" />
}

