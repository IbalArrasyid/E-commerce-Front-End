import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'TV-Stands',
};

export default async function TVStandsPage() {
  const { products, categoryId } = await getProducts('tv-stands', ['tv-stands'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="TV-Stands" />
}

