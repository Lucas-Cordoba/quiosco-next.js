'use client'

import { Product } from "@/src/generated/prisma/client"
import { useStore } from "@/src/store"
type AddProductButtonProps = {
    product: Product
}
export default function AddProductButton({product} : AddProductButtonProps ) {
   
    const addToOrder = useStore((state) => state.addToOrder)
   
    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer"
            onClick={() => addToOrder(product)}
        >Agregar</button>
    )
}

//Hacemos este componente como cliente porque es la unica parte que lo requiere para no hacer todo lo otro como cliente porque no lo necesita