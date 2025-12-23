import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const metadata = {
    title: 'Curtains',
};

export default async function CurtainsPage() {
    const { products, categoryId } = await getProducts('curtains', ['curtains'], 100);

    return <ProductsPage categoryId={categoryId} products={products} category="Curtains" />
}

