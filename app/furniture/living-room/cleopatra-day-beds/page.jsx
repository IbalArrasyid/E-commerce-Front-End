import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cleopatra Day Beds',
};

export default async function CleopatraDayBedsPage() {
  const { products, categoryId } = await getProducts('cleopatra-day-beds', ['cleopatra-day-beds'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Cleopatra Day Beds" />
}

