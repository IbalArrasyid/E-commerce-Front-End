import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function RoomDividersPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(222, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Room Dividers"
    />
  );
}
