import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function MirrorsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(186, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Mirrors"
    />
  );
}
