'use server'
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

 //es mejor hacer un archivo de acción para poder ejecutar código en el servidor, ya que no se puede ejecutar código del cliente en el servidor, por lo que se hace un archivo de acción para poder ejecutar código en el servidor y poder acceder a la base de datos 

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data) //validamos los datos del formulario con el esquema de validación
    
    if (result.success) {
        try {   
        await prisma.order.update({
            where:{
                id: result.data.orderId
            },
            data:{
                status: true, //pasa el estado de la orden a true para saber que ya esta completada
                orderReadyAt: new Date(Date.now()) //se guarda la fecha en que se completo la orden
            }
            
        })
        
        revalidatePath('/admin/orders') //se vuelve a renderizar la pagina de ordenes para que se actualice la lista de ordenes pendientes
    } catch (error) {
        console.log(error)   
    }
    }


    
}