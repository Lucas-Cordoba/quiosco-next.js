'use client' //le ponemos use client porque el useParams solo se usa en componentes de cliente
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@/src/generated/prisma/client"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category}: CategoryIconProps) {
    
    const params = useParams<{category: string}>()

    return (
        <>  
            <div className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>
                {/**La condicion evalia en que categoria esta y en la que esta le pone ese background color */}
                <div className="relative size-16"> {/** Esto es teneer width-16 y  height en 16, para hacerlo con una sola propiedad ponemos size*/}
                    <Image
                        src={`/icon_${category.slug}.svg`}
                        alt={`Imagen de la categoria: ${category.name}`}
                        fill
                    />
                </div>
                <Link
                    className="text-lg font-bold"
                    href={`/order/${category.slug}`} //esto nos lleva a la pagina de ese producto lo podemos llevar con id, nombre, etc
                >{category.name}
                    
                </Link>
            </div>
        </>
    )
}
//next tiene una serie de mejoras de performance y una de ellas es el componente de imagen, te permite mostrar imagenes manteniendo la calidad en formatos modernos de una forma rapida
