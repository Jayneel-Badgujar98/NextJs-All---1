// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";


// export function route(req,res){
//     try{
//         const verify = jwt.verify(req.cookies.get("admin-token").value, "secretkey");
//         console.log(verify);
//     }
//     catch(err){
//         return NextResponse.json({message: "Token expired"})
//     }
// }