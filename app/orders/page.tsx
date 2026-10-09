'use client'
import useSWR from 'swr'
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'
export default function OrdersPage() {

    const url = '/orders/api'

    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000, //si le pongo cero no se va a recargar pero si pongo 1000 se va a recargar cada 1 segundo, le ponemos 60000 que es un minuto para que noo haga consulta a la base de datos cada un segundo
        revalidateOnFocus: false //determina si SWR debe volver a pedir los datos a la API automáticamente cuando el usuario vuelve a enfocar la pestaña del navegador, es para que no pida los datos cada vez que recargo la pagina
    })

    if (isLoading) return <p>Cargando...</p>
    if(data) return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>
            <Logo />
            {data.length ? (
                <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                    {data.map(order => (
                        <LatestOrderItem
                        key={order.id}
                        order={order}/>
                    ))}
                </div>

            ) : <p className="text-center my-10">No hay ordenes listas</p>}
        </>
    )
}
