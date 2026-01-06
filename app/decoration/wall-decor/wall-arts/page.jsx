import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function WallArtsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(207, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Wall Arts"
    />
  );
}
