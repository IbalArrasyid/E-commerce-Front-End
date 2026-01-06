import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function DraperyFabricsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(5112, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Drapery Fabrics"
    />
  );
}
