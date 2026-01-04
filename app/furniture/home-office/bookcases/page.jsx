import ProductsPage from "@/components/ProductsPage";
import { getProductsByCategoryId } from "@/services/api";

export const dynamic = 'force-dynamic';

export default async function BookcasesPage() {
    const { products, categoryId } =
        await getProductsByCategoryId(99, 24);

    return (
        <ProductsPage
            categoryId={categoryId}
            products={products}
            category="Bookcases"
        />
    );
}
