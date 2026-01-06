import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function SquareCushionsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(208, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Square Cushions"
    />
  );
}
