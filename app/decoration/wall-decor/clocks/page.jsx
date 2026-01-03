import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";
import { generateCategoryMetadata } from "@/lib/categoryMetadata";

export const dynamic = 'force-dynamic';

const CATEGORY_SLUG = 'clocks';
const CATEGORY_NAME = 'Clocks';

export async function generateMetadata() {
  return generateCategoryMetadata(CATEGORY_SLUG, CATEGORY_NAME);
}

export default async function ClocksPage() {
  const { products, categoryId } = await getProducts(CATEGORY_SLUG, [CATEGORY_SLUG], 24);

  return <ProductsPage categoryId={categoryId} products={products} category={CATEGORY_NAME} />
}
