import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const metadata = {
    title: 'Blackout Curtains',
};

export default async function BlackoutCurtainsPage() {
    const { products, categoryId } = await getProducts('blackout-curtains', ['blackout-curtains'], 100);

    return <ProductsPage categoryId={categoryId} products={products} category="Blackout Curtains" />
}

