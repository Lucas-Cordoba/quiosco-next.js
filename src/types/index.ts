import { Order, OrderProducts, Product } from "../generated/prisma/client";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
} //toma los atributos de Product y le agrega estos dos tambien

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}