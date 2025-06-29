// app/ssg-page/page.js
// export const dynamic = "force-static"; // optional, makes it static
export const dynamic = "force-dynamic"; // optional, makes it dynamic


export default async function SSGPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/2");
  const post = await res.json();

  return (
    <div className="p-6 text-white bg-blue-800 min-h-screen">
      <h1 className="text-3xl font-bold">SSG Page</h1>
      <p className="mt-4">{post.title}</p>
    </div>
  );
}
