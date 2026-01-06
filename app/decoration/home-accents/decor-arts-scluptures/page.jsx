import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function DecorArtsSclupturesPage() {
  const { products, categoryId } =
    await getProductsByCategoryId(225, 24);

  return (
    <ProductsPage
      categoryId={categoryId}
      products={products}
      category="Decor Arts & Sculptures"
    />
  );
}
