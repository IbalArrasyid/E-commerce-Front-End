import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function SofasPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(94, 100);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Sofa"
    />
  );
}
