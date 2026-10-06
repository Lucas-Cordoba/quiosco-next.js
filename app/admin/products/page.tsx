import { redirect } from "next/navigation"
import Link from "next/link"
import ProductsPagination from "@/components/products/ProductsPagination"
import ProductsTable from "@/components/products/ProductsTable"
import ProductSearchForm from "@/components/products/ProductSearchForm"
import  Heading  from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function productCount() { //esto lo hacemos para saber cuantos productos tenemos en total para ver cuanta paginacion necesitamos
  return await prisma.product.count() //esto nos devuelve la cantidad de productos que tenemos en la base de datos
}
async function  getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize //cantidad de productos que queremos saltar, en este caso 0 para la primera página, 10 para la segunda página, 20 para la tercera página, etc.
  const products = await prisma.product.findMany({
    skip,
    take:pageSize, //take es para limitar la cantidad de productos que queremos traer, en este caso 10
    include: {
      category: true
    }
  })

  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>
export default async function ProductsPage({searchParams} : {searchParams: {page: string}}) { //searchParams es un objeto que contiene los parámetros de búsqueda de la URL
  
  const page = +searchParams.page || 1 //si no hay un parámetro de búsqueda llamado page, se asigna el valor 1 por defecto
  const pageSize= 10 //cantidad de productos que queremos mostrar por página
  
  // const products = await getProducts(page, pageSize)
  // const totalProducts = await productCount() //cantidad total de productos en la base de datos
  //como son dos consultas independientes, podemos hacerlas en paralelo 
  
  //si voy a la -y algo me da error de react

  if(page < 0) redirect('/admin/products') //una forma de hacerlo
  const productsData = await getProducts(page, pageSize)
  const totalProductsData = await productCount() //cantidad total de productos en la base de datos
  
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData]) //esto nos permite ejecutar las dos consultas en paralelo 
  
  const totalPages = Math.ceil(totalProducts / pageSize) //cantidad total de páginas que necesitamos para mostrar todos los productos, la funcion Math.ceil redondea hacia arriba, para que si tenemos 11 productos y un pageSize de 10, nos de 2 páginas en total
  
  if(page > totalPages) redirect('/admin/products')
  return (
    <>
      <Heading>Administrar Productos</Heading>
    
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear Producto </Link>

        <ProductSearchForm/>


      </div>
      <ProductsTable products={products} />
      <ProductsPagination 
        page={page}
        totalPages={totalPages}
      />
    </>

  )
}
