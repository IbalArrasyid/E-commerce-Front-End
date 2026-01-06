import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function BowlsTraysPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(197, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Bowls & Trays"
    />
  );
}
