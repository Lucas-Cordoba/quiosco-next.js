'use server' //se hace un archivo de acción para poder ejecutar código en el servidor, ya que no se puede ejecutar código del cliente en el servidor, por lo que se hace un archivo de acción para poder ejecutar código en el servidor y poder acceder a la base de datos y a las cookies del cliente.

export async function createOrder() {
    console.log('Creando pedido...')
}