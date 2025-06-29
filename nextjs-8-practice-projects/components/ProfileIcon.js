import { getServerSession } from "next-auth/next"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import Link from "next/link"
const profileIcon = async() => {
    const session = await getServerSession(authOptions)
    if (!session) return
    const user = await prisma.User.findUnique({
        where: { email: session.user.email }
    })
    let profileImage = session.user.image || user.image
    return (
        <Link href="/profile" className="fixed top-12 left-12 w-40 flex items-center justify-around gap-4 border-2 border-red-500 rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-300 cursor-pointer group ">
            <div className="w-12 text-start h-12 rounded-full overflow-hidden border-2 border-red-500 group-hover:border-pink-500 transition-all duration-300">
                {profileImage ? <img
                    src={profileImage}
                    alt="Profile Icon"
                  
                    className="w-full h-full object-cover"
                />
                    : <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-400">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>}

            </div>

            <span className="text-xl font-semibold text-white text-start ">Profile</span>
        </Link>
    )
}
export default profileIcon