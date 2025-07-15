import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        // console.log("No user found")
        return null;
    }
    try {
        // console.log(user.firstName, user.lastName);
        const findLoggedInUser = await prisma.User.findUnique({
            where: {
                clerkUserId: user.id,
            }
        })
        if (!findLoggedInUser) {
            const userName = `${user.firstName} ${user.lastName}`;
            const newUser = await prisma.User.create({
                data: {
                    clerkUserId: user.id,
                    name : userName,
                    email: user.emailAddresses[0].emailAddress,
                    imageUrl: user.imageUrl,
                }
            })
            // console.log(newUser)
            return newUser
        }
        // console.log(findLoggedInUser)
        return findLoggedInUser

    } catch (error) {
        console.log(error)
        return null

    }
}
