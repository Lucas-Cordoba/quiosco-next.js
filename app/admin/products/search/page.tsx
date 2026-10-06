import Heading from "@/components/ui/Heading"
import ProductTable from "@/components/products/ProductsTable"
import { prisma } from "@/src/lib/prisma"
import ProductSearchForm from "@/components/products/ProductSearchForm"
async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive' //no distingue de mayusculas y minusculas
            }
        }, //filtro de búsqueda muy potente que utilizas dentro de una consulta de Prisma ORM para buscar en tu base de datos.contains: searchTerm: Funciona como un operador tipo "contiene" similar a LIKE, 
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <Heading>Resultado de búsqueda: {searchParams.search}</Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable
                    products={products}
                />
            ): <p className="text-center text-lg mt-5">No hay resultados</p>}

        </>


    )
}

