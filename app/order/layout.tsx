import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";

export default function RootLayout({children,} : Readonly<{children: React.ReactNode}>) {
    return (
        <>
        <div className="md:flex">
            <OrderSidebar/>

            <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                {children} {/*Todo lo de page se inyecta en este children lo tenemos que poner para que lo de order se vea*/}
            </main>

           <OrderSummary/>
        </div>
        </>
    )
}