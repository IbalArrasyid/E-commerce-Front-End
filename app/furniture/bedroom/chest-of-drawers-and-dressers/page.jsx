import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";
import { generateCategoryMetadata } from "@/lib/categoryMetadata";

export const dynamic = 'force-dynamic';

const CATEGORY_SLUG = 'chest-of-drawers-and-dressers';
const CATEGORY_NAME = 'Chest of Drawers and Dressers';

export async function generateMetadata() {
  return generateCategoryMetadata(CATEGORY_SLUG, CATEGORY_NAME);
}

export default async function ChestOfDrawersAndDressersPage() {
  const { products, categoryId } = await getProducts(CATEGORY_SLUG, [CATEGORY_SLUG], 24);

  return <ProductsPage categoryId={categoryId} products={products} category={CATEGORY_NAME} />
}
