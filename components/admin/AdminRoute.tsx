'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
type AdminRouteProps = {
    link: {
        url: string,
        text: string,
        blank: boolean
    }
}
export default function AdminRoute({ link }: AdminRouteProps) {
  
  const pathname = usePathname()
  const isActive = pathname.startsWith(link.url) //comúnmente en desarrollo web (especialmente en frameworks como Next.js) para determinar si un enlace del menú de navegación se encuentra activo
  return (
    <Link
    className={`font-bold text-lg border-y border-gray-200 p-3 ${isActive ? "bg-amber-400": ""}`}
    href={link.url}
    target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  )
}
