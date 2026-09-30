import { Product } from "@/src/generated/prisma/client"
import { formatCurrency } from "@/src/utils"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
    return (

        <div className="border bg-white">
            <Image //lo bueno de next.js es que va trayendo las imagenes a medida que se van requiriendo no hace consultas por todas, esto nos da una mejor performance y lo bueno que te lo pasa al formato .webp que es moderno y de buena calidad y ligeros
                width={400}
                height={500} //en este caso no ponemos fill porque quedan muy estiradas
                src={`/products/${product.image}.jpg`}
                alt={`Imagen platillo ${product.name}`}
            // quality={100} //seria la maxima calidad que queremos, por default tiene 75
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer"
                >Agregar</button>
            </div>

        </div>
    )
}

