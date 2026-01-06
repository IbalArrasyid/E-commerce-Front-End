import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function FlowerArrangementPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(190, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Flower Arrangement"
    />
  );
}
