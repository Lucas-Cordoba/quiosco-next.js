'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'
import { getImagePath } from '@/src/utils'


export default function ImageUpload({image} : {image: string | undefined}) {//puede estar o no

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-expect-error es un comentario de directiva que le indica a TypeScript que ignore el siguiente error de tipado en la línea de código posterior.
                    setImageUrl(result.info?.secure_url)
                }
            }} 
            uploadPreset="preset_quiosco" 
            options={{
                maxFiles: 1 
            }}
        >
            {({ open }) => (
                <>
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover:opacity-70 transition p-10 border-dashed border-2 border-neutral-300 flex flex-col justify-center items-center gap-4 text-slate-800 bg-slate-100 rounded-md"
                    >
                        <TbPhotoPlus size={50} />
                        <p className="text-lg font-semibold">Agregar Imagen</p>

                        {imageUrl && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    src={imageUrl}
                                    alt="Imagen de Producto"
                                />
                            </div>
                        )}
                    </div>
                        {image && !imageUrl && ( //esto es para que si no cambiaste la imagen aparezca la actual y si pusiste otra que no se muestre la actual
                            <div className='space-y-2 flex flex-col items-center'>
                                <label>Imagen Actual:</label>
                                <div className='relative w-64 h-64'>
                                    <Image
                                        fill
                                        src={getImagePath(image)}
                                        alt='Imagen Producto'
                                        style={{objectFit: 'contain'}}
                                    />
                                </div>
                            </div>
                        )}
                    <input 
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl ? imageUrl : image} //esto es para que ponga la imagen nueva o sino para editar se pone la imagen que ya estaba
                        //se pone Se usa defaultValue para establecer un valor inicial que el input tendrá cuando se renderice por primera vez, pero permitiendo que cambie o se actualice libremente a medida que el usuario interactúa con la aplicación
                    />
                </>
            )}
        </CldUploadWidget>
    )
}