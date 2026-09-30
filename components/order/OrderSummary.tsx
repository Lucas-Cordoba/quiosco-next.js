'use client' //lo hacemos componente de cliente porque zustand solo funciona en componentes de cliente
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
 //Su función principal es reducir todos los elementos de un array a un único valor (que puede ser un número, un string, un objeto o incluso otro arreglo) acumulando un resultado a medida que pasa por cada elemento.
  return (

    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
        {order.length ===0 ? <p className="text-center my-16">El carrito esta vacio</p> : (
          <div className="nt-5">
            {order.map(item => (
              <ProductDetails
              key={item.id}
              item={item}
              />
            ))}

            <p className="text-xl mt-20 text-center">Total a pagar: {' '}
<span className="font-bold">{formatCurrency(total)}</span>

            </p>

          </div>
        )}

    </aside>
  )
}
