// file : app/blog/viewBlog/[id]/page.js
// "use client"
// import React from 'react'
// import { useEffect, useState ,use } from "react"

// const View = ({ params }) => {
//     const {id} = use(params) ;
//     const [blogData, setBlogData] = useState({
//         title: "",
//         content: "",
//         userId: "",
//     });
//     useEffect(() => {
//         const fetchBLog = async () => {
//             const res = await fetch(`/api/blogs/findBlog`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ userId : id }),
//                 }
//             );
//             const data = await res.json();
//             console.log(data);
//             setBlogData(data)
//         }
//         fetchBLog()
//     }, [id])
//     return (
//         <div>
//             <h1>View Blog</h1>
//             <p>{blogData.title}</p>
//             <p>{blogData.content}</p>
//             <p>{blogData.userId}</p>

//         </div>
//     )
// }

// export default View

// ✅ Remove "use client"

// file : app/blog/viewBlog/[id]/page.js
import { prisma } from "@/lib/prisma";

const View = async ({ params }) => {
    const { id } = await params;
    console.log(id);
    const blogData = await prisma.blog.findFirst({
        where: { userId: id },
    });

    if (!blogData) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <h1>View Blog</h1>
            <p>{blogData.title}</p>
            <p>{blogData.content}</p>
            <p>{blogData.userId}</p>
        </div>
    );
};

export default View;
