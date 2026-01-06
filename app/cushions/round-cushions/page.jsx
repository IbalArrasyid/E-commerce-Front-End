import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function RoundCushionsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(4054, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Round Cushions"
    />
  );
}
