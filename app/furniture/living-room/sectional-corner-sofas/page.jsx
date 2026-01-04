import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function SectionalCornerSofasPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(222, 100);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Sectional Corner Sofa"
    />
  );
}
