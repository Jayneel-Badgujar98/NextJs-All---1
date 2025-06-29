"use client"
import React, { useState, useRef } from 'react'

const ImageUploadPopup = ({ refresh, setRefresh }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const fileInputRef = useRef(null)

    const [imageFile, setImageFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("")

    const uploadToCloudinary = async (file) => {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: data,
        })

        const result = await res.json()
        return result.secure_url // This is your final image URL
    }


    const handleSubmit = async () => {
        setMessage("")
        setError("")
        setLoading(true)
        if (!imageFile) {
            setError("Please choose an image")
            setLoading(false)
            return
        }

        if (!title.trim()) {
            setError("Please enter a title")
            setLoading(false)
            return
        }

        try {
            // First: Upload to Cloudinary
            const imageUrl = await uploadToCloudinary(imageFile)

            // Then: Save to DB via your own API
            const res = await fetch("/api/uploadImage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl, title }),
            })
            setRefresh(!refresh)
            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to upload")
            } else {
                setLoading(false)
                setMessage("Image uploaded successfully!")
                setImageFile(null)
                setPreviewUrl("")
                setTitle("")
            }
        } catch (err) {
            console.error(err)
            setError("Something went wrong.")
        }
    }

    return (
        <div>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-500 transition"
            >
                + Upload
            </button>

            {/* Upload Popup */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-96 bg-black text-white p-6 rounded-xl shadow-2xl z-50 border border-red-500">
                    <h2 className="text-xl font-bold mb-4 text-red-500">Upload Image</h2>

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded mb-4 border border-white"
                        />
                    )}

                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="w-full p-3 mb-3 bg-gray-800 rounded text-center text-gray-300 cursor-pointer hover:bg-gray-700"
                    >
                        📷 Upload Image
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                setImageFile(file)
                                setPreviewUrl(URL.createObjectURL(file))
                            }
                        }}
                    />

                    {/* Input: Title */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter image title"
                        className="w-full p-2 mb-3 rounded bg-gray-800 text-white placeholder-gray-400"
                    />
                    {/* Upload Trigger */}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-500 w-full py-2 rounded font-bold"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>)}
                    {message && (
                        <p className="text-green-500 text-sm mt-2">{message}</p>)}
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-2 text-sm text-gray-400 hover:text-white"
                    >
                        Cancel
                    </button>
                </div>
            )}

        </div>
    )
}

export default ImageUploadPopup