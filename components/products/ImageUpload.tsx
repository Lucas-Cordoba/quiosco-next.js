'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'

export default function ImageUpload() {

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-ignore es un comentario de directiva que le indica a TypeScript que ignore el siguiente error de tipado en la línea de código posterior.
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

                    <input 
                        type="hidden"
                        name="image"
                        value={imageUrl} 
                    />
                </>
            )}
        </CldUploadWidget>
    )
}