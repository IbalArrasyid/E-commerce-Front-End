import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function ClocksPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(110, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Clocks"
    />
  );
}
