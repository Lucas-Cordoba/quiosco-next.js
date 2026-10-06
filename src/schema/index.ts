import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string()
        .min(1, 'Tu nombre es Obligatorio'), // se valida que el nombre tenga al menos 1 caracter
    total: z.number()
                .min(1, 'Hay errores en el pedido'),
    order: z.array(z.object({
        id:z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))

    });


    export const OrderIdSchema = z.object({
        orderId: z.string()
                    .transform((value) => parseInt(value))
                    .refine(value => value > 0, {message: 'Hay errores'}) //para asegurarnos que el id exista y transformarlo a numero 
    })