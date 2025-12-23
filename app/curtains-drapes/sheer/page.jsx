import ProductsPage from "@/components/ProductsPage";
import { getProducts } from "@/services/api";

export const metadata = {
    title: 'Sheer Curtains',
};

export default async function SheerCurtainsPage() {
    const { products, categoryId } = await getProducts('sheer', ['sheer'], 100);

    return <ProductsPage categoryId={categoryId} products={products} category="Sheer Curtains" />
}

