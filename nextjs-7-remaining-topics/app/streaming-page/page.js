// app/streaming-page/page.js
// import { Suspense } from "react";

// function Comments() {
//     return fetch("https://jsonplaceholder.typicode.com/comments/1")
//         .then(res => res.json())
//         .then(data => (
//             <div className="mt-4">
//                 <h2 className="text-xl font-semibold">Comment:</h2>
//                 <p>{data.body}</p>
//             </div>
//         ));
// }

// export default function StreamingPage() {
//     return (
//         <div className="p-6 text-white bg-purple-800 min-h-screen">
//             <h1 className="text-3xl font-bold">Streaming Page</h1>

//             <Suspense fallback={<p>Loading comments...</p>}>
//                 {/* Streaming kicks in here */}
//                 <Comments />
//             </Suspense>
//         </div>
//     );
// }
"use client";
import { Suspense, useEffect, useState } from "react";

// Simulate slow fetch
function fetchComment() {
  return new Promise(resolve =>
    setTimeout(() => resolve({ body: "This is a streamed comment after 3 seconds!" }), 3000)
  );
}

function Comment() {
  const [comment, setComment] = useState(null);

  useEffect(() => {
    fetchComment().then(data => setComment(data));
  }, []);

  if (!comment) return <p>Loading comment (Client)...</p>;

  return <p>{comment.body}</p>;
}

export default function StreamingClient() {
  return (
    <Suspense fallback={<p>Loading comment (Suspense)...</p>}>
      <Comment />
    </Suspense>
  );
}
