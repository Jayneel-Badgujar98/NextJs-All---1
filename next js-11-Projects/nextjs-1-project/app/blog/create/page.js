// // file - app/blog/create/page.js

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateBlog() {
//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");

//     const router = useRouter()
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const res = await fetch("/api/blogs/createBlog", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ title, content }),
//         });
//         if (!res.ok) {
//             window.alert("Failed to create blog");
//         }
//         const data = await res.json();
//         console.log("user id " + data.userId)
//         setTimeout(() => {
//             router.push(`/blog/viewBlog/${data.userId}`);
//         })
//         // alert(data);
//         console.log(data);
//     };

//     return (
//         <div className="p-12 w-full flex justify-start items-center h-screen flex-col">
//             <h1 className="text-xl font-bold mb-4">Create a Blog</h1>
//             <form onSubmit={handleSubmit} className="space-y-4 w-[50%]">
//                 <input
//                     className="border px-4 py-2 w-full"
//                     placeholder="Blog Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <textarea
//                     className="border px-4 py-2 w-full h-40"
//                     placeholder="Blog Content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 ></textarea>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                     Publish
//                 </button>
//             </form>
//         </div>
//     );
// }


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateBlog() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const handleAI = async () => {
//     setLoading(true);
//     const res = await fetch("/api/geminiAI-suggest", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content }),
//     });
//     const data = await res.json();
//     setContent(content + " " + data.suggestion);
//     setLoading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/blogs/createBlog", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, content }),
//     });

//     if (!res.ok) {
//       window.alert("Failed to create blog");
//     }

//     const data = await res.json();
//     router.push(`/blog/viewBlog/${data.userId}`);
//   };

//   return (
//     <div className="p-12 w-full flex justify-start items-center h-screen flex-col">
//       <h1 className="text-xl font-bold mb-4">Create a Blog</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 w-[50%]">
//         <input
//           className="border px-4 py-2 w-full"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="border px-4 py-2 w-full h-40"
//           placeholder="Blog Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         ></textarea>

//         <button
//           type="button"
//           onClick={handleAI}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Loading..." : "💡 Suggest with AI"}
//         </button>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Publish
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const textareaRef = useRef(null);

  const handleAI = async () => {
    setLoading(true);
    const res = await fetch("/api/geminiAI-suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    console.log(data);
    setSuggestion(data.suggestion || "");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (!suggestion) return;
    if (e.key === "Tab") {
      e.preventDefault();
      setContent((prev) => prev + (prev && !prev.endsWith(" ") ? " " : "") + suggestion);
      setSuggestion("");
    } else if (
      e.key.length === 1 ||
      e.key === "Backspace" ||
      e.key === "Delete"
    ) {
      setSuggestion("");
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    if (suggestion) setSuggestion("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/blogs/createBlog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) {
      window.alert("Failed to create blog");
      return;
    }
    const data = await res.json();
    router.push(`/blog/viewBlog/${data.userId}`);
  };

  return (
    <div className="p-12 w-full flex justify-start items-center h-screen flex-col">
      <h1 className="text-xl font-bold mb-4">Create a Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
        <input
          className="border px-4 py-2 w-full rounded"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="relative w-full h-40">
          {/* Suggestion Layer */}
          <textarea
            ref={textareaRef}
            className="absolute top-0 left-0 border px-4 py-2 w-full h-full rounded resize-none z-20  text-black font-mono bg-gray-500"
            placeholder="Blog Content"
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
          {suggestion && (
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 px-4 py-2 text-gray-800 pointer-events-none whitespace-pre-wrap font-mono leading-normal z-20 select-none w-full h-full overflow-hidden break-words"
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {content + (content && !content.endsWith(" ") ? " " : "") + suggestion}
            </div>
          )}

          {/* Textarea */}
        </div>
        <button
          type="button"
          onClick={handleAI}
          className="bg-green-500 text-white px-4 py-2  rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "💡 Suggest with AI"}
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
