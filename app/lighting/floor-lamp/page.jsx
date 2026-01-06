import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function FloorLampPage() {
    const { products, categoryId } =
        await getProductsByCategoryId(196, 24);

    return (
        <ProductsPage
            categoryId={categoryId}
            products={products}
            category="Floor Lamp"
        />
    );
}
