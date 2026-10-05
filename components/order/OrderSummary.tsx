'use client' //lo hacemos componente de cliente porque zustand solo funciona en componentes de cliente
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  //Su función principal es reducir todos los elementos de un array a un único valor (que puede ser un número, un string, un objeto o incluso otro arreglo) acumulando un resultado a medida que pasa por cada elemento.

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    const result = OrderSchema.safeParse(data) //validamos los datos del formulario con el esquema de validación
    console.log(result)
    if (!result.success) {
      // Aquí puedes manejar los errores de validación usando result.error.issues
      result.error.issues.forEach((issue) => {
        toast.error(issue.message) // Mostramos un toast por cada error de validación
      })
      return; // Salimos de la función si hay errores de validación
    } //VALIDACION DEL CLIENTE
    
    const response = await createOrder(data) //llamamos a la función que creamos en el archivo de acción
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message) // Mostramos un toast por cada error de validación
      })
    } //queremos de vuelta el mensaje en el cliente para ponerlo en el toast
  
    toast.success('Pedido realizado correctamente') //si todo sale bien mostramos un toast de exito
    clearOrder() //limpiamos el pedido
  }


  return (

    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? <p className="text-center my-16">El pedido esta vacio</p> : (
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

          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder} //disponibles en los app router, se ejecutan en el servidor y no en el cliente, por lo que no pueden acceder a los datos del cliente, como el estado de la aplicación o las cookies.
          >


            <input type="text"
              placeholder="Tu Nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value='Confirmar Pedido'
            />

          </form>
        </div>
      )}

    </aside>
  )
}
