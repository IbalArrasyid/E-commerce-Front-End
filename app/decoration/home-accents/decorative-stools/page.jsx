import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function DecorativeStoolsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(203, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Decorative Stools"
    />
  );
}
