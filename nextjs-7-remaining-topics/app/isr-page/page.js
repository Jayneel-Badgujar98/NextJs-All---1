// app/isr-page/page.js
export const revalidate = 10; // 10 seconds

export default async function ISRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/3");
  const post = await res.json();

  return (
    <div className="p-6 text-white bg-green-800 min-h-screen">
      <h1 className="text-3xl font-bold">ISR Page</h1>
      <p className="mt-4">{post.title}</p>
      <p className="text-sm mt-2">This page regenerates every 10 seconds</p>
    </div>
  );
}
