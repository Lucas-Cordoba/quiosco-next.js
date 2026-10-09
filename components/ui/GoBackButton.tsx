'use client'
import { useRouter } from "next/navigation";
export default function GoBackButton() {
    const router = useRouter()
  return (
     <button 
              onClick={()=> router.back()}  //esto es para volver a la pagina desde donde puse editar, el router.back lo que hace es volver a la pagina anterior
              className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
            >Volver </button>
  )
}
