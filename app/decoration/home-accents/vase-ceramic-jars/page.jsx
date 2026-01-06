import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function VaseCeramicJarsPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(199, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Vase & Ceramic Jars"
    />
  );
}
