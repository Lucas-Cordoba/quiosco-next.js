'use server'

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

 //se hace un archivo de acción para poder ejecutar código en el servidor, ya que no se puede ejecutar código del cliente en el servidor, por lo que se hace un archivo de acción para poder ejecutar código en el servidor y poder acceder a la base de datos y a las cookies del cliente.


export async function createOrder(data: unknown) { //no sabemos lo que va a llegar pero algo va a llegar
    const result = OrderSchema.safeParse(data) //validamos los datos del formulario con el esquema de validación

    if(!result.success){
        return {
            errors: result.error.issues
        }
    } //ponemos validacion en el cliente y en el servidor para que no se pueda enviar datos maliciosos al servidor, ya que el cliente puede ser manipulado por el usuario.

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product=> ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}