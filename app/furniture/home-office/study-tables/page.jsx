import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function StudyTablesPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(206, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Study Tables"
    />
  );
}
