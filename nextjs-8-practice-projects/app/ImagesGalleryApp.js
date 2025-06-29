// import ImageUploadPopup from "../components/ImageUploadPopup"
// const ImagesGalleryApp = () => {

//   return (
//     <div className="relative min-h-screen bg-gray-100">
//       {/* Your main gallery content */}
//       <h1 className="text-4xl text-center p-6 text-black">Images Gallery</h1>

//       {/* Add the Upload Popup */}
//       <ImageUploadPopup />
//     </div>
//   )
// }

// export default ImagesGalleryApp

"use client"
import ImageGrid from "@/components/ImageGrid"
import ImageUploadPopup from "../components/ImageUploadPopup"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"

const ImagesGalleryApp = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    // TODO: Fetch images from DB and update state
    // fetch("/api/images").then(res => res.json()).then(data => setImages(data))
    const fetchImages = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/getImages", {
          cache: "no-store" // Ensure fresh data on each load
        })
        if (!res.ok) {
          throw new Error("Failed to fetch images")
        }
        const data = await res.json()
        setLoading(false)
        setImages(data)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchImages()
  }
    , [refresh])

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white flex flex-col">
      <div className="fixed top-12 transition-all duration-100 ease-in-out right-12 hover:bg-red-500 hover:ring-white hover:ring-2 bg-red-600 text-white font-bold px-4 py-2 rounded"><button onClick = {() => signOut()}>Sign out</button></div>

      {/* Header */}
      <header className="py-18 px-6 ">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400 animate-text-gradient">
          Explore Your Image Gallery
        </h1>
        <p className="mt-4 text-center text-gray-300 max-w-xl mx-auto font-light tracking-wide">
          Upload, browse, and enjoy your favorite images in one beautiful place.
        </p>
      </header>

      {/* Upload Button */}

      <ImageUploadPopup refresh={refresh} setRefresh={setRefresh} />

      {/* Image Grid */}
      <section className="flex-grow px-6 pb-12 max-w-7xl mx-auto">
        {loading && (
          <div className="text-center py-12 flex flex-col items-center ">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400 animate-text-gradient bg-clip-text text-transparent">Loading Images...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-r-2 border-gray-300"></div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Error Loading Images</h2>
            <p>{error}</p>
          </div>
        )}
        <ImageGrid
          images={images}

        />
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm select-none">
        &copy; {new Date().getFullYear()} Your Gallery App. All rights reserved.
      </footer>

      <style jsx>{`
        /* Gradient text animation */
        @keyframes text-gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-text-gradient {
          background-size: 200% 200%;
          animation: text-gradient 6s ease infinite;
        }
      `}</style>
    </main>
  )
}

export default ImagesGalleryApp

