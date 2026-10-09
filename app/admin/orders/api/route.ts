import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic' //se agrega dynamic y esto hace que los endpoint no queden cacheados y sean dinamicos si los dejamos estaticos tardan 10 min mas o menos en actualizarse
export async function GET(){

    const orders = await prisma.order.findMany({
        where: {
          status: false
        },
        include: {
          orderProducts: {
            include: {
              product: true
            }
          }
        }
    
      })
    return Response.json(orders)
}


//se puede tener diferente funciones como GET, POST, PATCH, PUT, DELETE, etc