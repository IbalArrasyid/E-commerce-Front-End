import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function PromotionalFabricsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(146, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Promotional Fabrics"
    />
  );
}
