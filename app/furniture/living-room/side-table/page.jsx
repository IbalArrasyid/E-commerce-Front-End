import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function SideTablePage() {
  const { products, categoryId } =
    await getProductsByCategoryId(183, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Side Table"
    />
  );
}
