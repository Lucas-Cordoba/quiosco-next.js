'use client' //lo hacemos componente de cliente porque zustand solo funciona en componentes de cliente
import { useStore } from "@/src/store"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  return (

    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
        {order.length ===0 ? <p className="text-center my-16">El carrito esta vacio</p> : (
          <div className="nt-5">
            <p>Si hay algo</p>
          </div>
        )}

    </aside>
  )
}
