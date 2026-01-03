import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'TV Cabinets',
};

export default async function TvCabinetsPage() {
  const { products, categoryId } = await getProducts('tv-cabinets', ['tv-cabinets'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="TV Cabinets" />
}

