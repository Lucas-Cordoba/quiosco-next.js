'use client'
import useSWR from 'swr' //usamos SWR para poder obtener datos en tiempo real sin tener que actualizar la orden
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from '@/src/types';




export default function OrdersPage() {
  
  const url = '/admin/orders/api'
 
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000, //si le pongo cero no se va a recargar pero si pongo 1000 se va a recargar cada 1 segundo, le ponemos 60000 que es un minuto para que noo haga consulta a la base de datos cada un segundo
    revalidateOnFocus: false //determina si SWR debe volver a pedir los datos a la API automáticamente cuando el usuario vuelve a enfocar la pestaña del navegador, es para que no pida los datos cada vez que recargo la pagina
  }) 

  if(isLoading) return <p>Cargando...</p>
  if(data) return (
    <>
      <Heading>Administrar Ordenes</Heading>

      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : <p className="text-center text-lg">No hay ordenes pendientes</p>}
    </>
  )
}
