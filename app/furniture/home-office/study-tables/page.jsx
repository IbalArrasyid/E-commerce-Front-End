import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";
import { generateCategoryMetadata } from "@/lib/categoryMetadata";

export const dynamic = 'force-dynamic';

const CATEGORY_SLUG = 'study-tables';
const CATEGORY_NAME = 'Study Tables';

export async function generateMetadata() {
  return generateCategoryMetadata(CATEGORY_SLUG, CATEGORY_NAME);
}

export default async function StudyTablesPage() {
  const { products, categoryId } = await getProducts(CATEGORY_SLUG, ['study-tables'], 24);

  return <ProductsPage categoryId={categoryId} products={products} category={CATEGORY_NAME} />
}
