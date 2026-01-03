import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Arm Chairs',
};

export default async function ArmChairsPage() {
  const { products, categoryId } = await getProducts('arm-chairs', ['arm-chairs'], 100);

  return <ProductsPage categoryId={categoryId} products={products} category="Arm Chairs" />
}

