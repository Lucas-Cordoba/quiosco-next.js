import Link from "next/link";

type ProductsPaginationProps = {
    page: number,
    totalPages: number
}
export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1) //generar un array de números secuenciales, en este caso del 1 al 8. Es una técnica muy común en React para crear un paginador dinámico basándose en el total de páginas. 
    return (
        <>
            <nav className="flex justify-center py-10">

                {page > 1 && (
                    <Link
                        href={`/admin/products?page=${page - 1}`}
                        className="bg-white hover:bg-gray-200 px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" //Tailwind ofrece ring (que aplica la propiedad CSS box-shadow simulando un contorno o anillo exterior).focus es un modificador de estadoIndica que los estilos que le siguen solo se van a aplicar cuando el usuario interactúe con el elemento
                    >&laquo;</Link>

                )}

                {pages.map(currentPage => (
                    <Link
                        key={currentPage}
                        href={`/admin/products?page=${currentPage}`}
                        className={`${page === currentPage ? 'font-black bg-gray-600 text-white' : 'bg-white'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >{currentPage}</Link>
                ))}
                {page < totalPages && (

                    <Link
                        href={`/admin/products?page=${page + 1}`}
                        className="bg-white hover:bg-gray-200 px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" //Tailwind ofrece ring (que aplica la propiedad CSS box-shadow simulando un contorno o anillo exterior).focus es un modificador de estadoIndica que los estilos que le siguen solo se van a aplicar cuando el usuario interactúe con el elemento
                    >&raquo;</Link>
                )}
            </nav>
        </>
    )
}
