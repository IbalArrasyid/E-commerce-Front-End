import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function SheerCurtainsPage() {
    const { products, categoryId } =
        await getProductsByCategoryId(5959, 24);

    return (
        <ProductsPage
            categoryId={categoryId}
            products={products}
            category="Sheer Curtains"
        />
    );
}
