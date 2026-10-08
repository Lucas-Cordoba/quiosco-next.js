import { prisma } from "@/src/lib/prisma"
import { notFound, redirect } from "next/navigation"


async function getProductById(id:number) {
    const product = await prisma.product.findUnique({
        where:{
            id
        }//por default se trae el primer registro con esta condicion, puede traer mas con take
    })
    if(!product){
        notFound()
    }
}
export default async function EditProductsPage({params}: {params: {id: string}}) {
    
    const product = await getProductById(+params.id)
    return (
    <div>page</div>
  )
}
