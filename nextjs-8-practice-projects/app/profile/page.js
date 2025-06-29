import ImageGrid from "@/components/ImageGrid"
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import prisma from "@/lib/prisma"
import Link from "next/link"
const page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return <div className="min-h-screen flex items-center justify-center">Not logged in</div>

  const user = await prisma.User.findUnique({ where: { email: session.user.email } })
  if (!user) return <div className="min-h-screen flex items-center justify-center">User not found</div>

  const images = await prisma.ImagePost.findMany({ where: { userId: user.id }, include: { user: true} , orderBy: { createdAt: "desc" } })

  // Use session.user.image if available, otherwise use user.image
  const profileImage = session.user.image || user.image

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white">
      <Link href="/" className="fixed top-12 left-12 w-20 flex items-center justify-around gap-4 border-2 border-red-500 rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-300 cursor-pointer group ">Back</Link>
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-12">
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 group-hover:border-pink-500 transition-all duration-300">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400">
                {user.name}
              </h1>
              <p className="text-gray-400 text-lg">{user.email}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-4 py-2 bg-red-500/20 rounded-full text-sm font-medium">
                  {images.length} {images.length === 1 ? "Image" : "Images"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400">
            Your Uploaded Images
          </h2>
          {images.length > 0 ? (
            <ImageGrid images={images} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl italic">
                You haven't uploaded any images yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default page
