import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function TrolleysBarCartsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(194, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Trolleys Bar Carts"
    />
  );
}
