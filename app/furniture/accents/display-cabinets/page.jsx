import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function DisplayCabinetsPage() {
    const { products, categoryId } =
        await getProductsByCategoryId(224, 24);

    return (
        <ProductsPage
            categoryId={categoryId}
            products={products}
            category="Display Cabinets"
        />
    );
}
