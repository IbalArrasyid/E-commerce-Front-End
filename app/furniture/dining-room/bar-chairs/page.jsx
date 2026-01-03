import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";
import { generateCategoryMetadata } from "@/lib/categoryMetadata";

export const dynamic = 'force-dynamic';

const CATEGORY_SLUG = 'bar-chairs';
const CATEGORY_NAME = 'Bar Chairs';

export async function generateMetadata() {
  return generateCategoryMetadata(CATEGORY_SLUG, CATEGORY_NAME);
}

export default async function BarChairsPage() {
  const { products, categoryId } = await getProducts(CATEGORY_SLUG, [CATEGORY_SLUG], 24);

  return <ProductsPage categoryId={categoryId} products={products} category={CATEGORY_NAME} />
}
