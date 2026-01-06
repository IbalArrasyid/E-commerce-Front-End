import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function RectangleCushionsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(209, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Rectangle Cushions"
    />
  );
}
