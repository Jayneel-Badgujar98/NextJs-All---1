// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient()
// export const DELETE = async(req) => {
//     const body = await req.json();

//     const Response = await prisma.newUser.delete({
//         where : {
//             id : body.id 
//         }
//     })
//     return Response.json(Response)
// }

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const DELETE = async(req) => {
    const body = await req.json();

    const deleted = await prisma.newUser.delete({
        where : {
            id : body.id 
        }
    })
    return Response.json(deleted)
}


