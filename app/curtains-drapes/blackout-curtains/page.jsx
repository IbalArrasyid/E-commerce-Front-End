import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function BlackoutCurtainsPage() {
    const { products, categoryId } =
        await getProductsByCategoryId(5957, 24);

    return (
        <ProductsPage
            categoryId={categoryId}
            products={products}
            category="Blackout Curtains"
        />
    );
}
