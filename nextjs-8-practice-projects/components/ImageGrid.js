// components/ImageGrid.js
"use client"
import React from 'react'

const ImageGrid = ({ images = [] }) => {
    return (
        <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 l gap-6">
            {images.map((img) => (
                <div key={img.id} className="bg-black rounded-xl overflow-hidden hover:shadow-lg transition-all duration-100 ease-in-out shadow-white">
                    <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-60 object-cover"
                    />
                    <div className="p-4 text-white">
                        <h2 className="text-lg font-semibold truncate">{img.title}</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            by {img.user?.name || "Unknown"} • {new Date(img.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ImageGrid
