import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function TableLampPage() {
    const { products, categoryId } =
        await getProductsByCategoryId(107, 24);

    return (
        <ProductsPage
            categoryId={categoryId}
            products={products}
            category="Table Lamp"
        />
    );
}
