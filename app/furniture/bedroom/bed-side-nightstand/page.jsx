import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bed Side Nightstand',
};

export default async function BedSideNightstandPage() {
  const { products, categoryId } = await getProducts('bed-side-nightstand', ['bed-side-nightstand'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Bed Side Nightstand" />
}

