import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function CandleHoldersPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(226, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Candle Holders"
    />
  );
}
