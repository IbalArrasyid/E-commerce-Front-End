import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";
import { generateCategoryMetadata } from "@/lib/categoryMetadata";

export const dynamic = 'force-dynamic';

const CATEGORY_SLUG = 'executive-chairs';
const CATEGORY_NAME = 'Executive Chairs';

export async function generateMetadata() {
  return generateCategoryMetadata(CATEGORY_SLUG, CATEGORY_NAME);
}

export default async function ExecutiveChairsPage() {
  const { products, categoryId } = await getProducts(CATEGORY_SLUG, ['executive-chairs'], 24);

  return <ProductsPage categoryId={categoryId} products={products} category={CATEGORY_NAME} />
}
