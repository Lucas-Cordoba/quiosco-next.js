//como este page esta dentro de la carpeta entre corchetes ya utiliza routing dinamico

import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            } //la categoria que tenga ese producto traemos el slug
        }
    })

    return products
}

export default async function OrderPage({ params }: { params: { category: string } }) {//de esta forma el params va a ser un string, params nos sirve para leer parametros desde la url

    const products = await getProducts(params.category)
    return (
        <>

            <Heading>Elige y personaliza tu pedido a continuación</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
                {products.map(product => (

                    <ProductCard 
                        key={product.id}
                        product= {product}
                    />
                ))}
            </div>
        </>
    )
}
