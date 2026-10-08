export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function getImagePath(imagePath: string) {

    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)){
        return imagePath
    }else{
        return `/products/${imagePath}.jpg`
    }
} //sirve como un formateador o resolutor de rutas para las imágenes, permitiendo que tu aplicación maneje dos escenarios diferentes sobre de dónde provienen las imágenes de los productos: