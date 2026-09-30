import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from './generated/prisma/client'
import { products } from '@/prisma/data/products'

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {

        const { categoryId, image, ...data } = product
        let order: OrderItem[] = []
        if (get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set(() => ({
            order
        }))

    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1, 
            subtotal: item.price * (item.quantity - 1)

        } : item)
        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    }


}))
//const (Constante): Se utiliza para valores que no van a cambiar a lo largo del tiempo.
//let: Se utiliza para variables cuyo valor va a cambiar o ser reasignado más adelante en la ejecución del código


/**Lo usas directamente dentro de las funciones de acción que modifican el estado (las que están adentro del create(...)
 get() es una función que te devuelve el estado global actual en cualquier momento dentro de tu store, sin necesidad de estar dentro de un set.
 */