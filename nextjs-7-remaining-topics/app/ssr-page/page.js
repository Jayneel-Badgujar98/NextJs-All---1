// app/ssr-page/page.js// Next.js 13 app router style (React Server Component)

export async function generateMetadata() {
  return { title: 'SSR Page' };
}

export default async function SSRPage() {
  // Server-side fetch on EVERY request
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', { cache: 'no-store' });
  const post = await res.json();

  return (
    <div>
      <h1>Server Side Rendering (SSR)</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>Fetched at: {new Date().toLocaleTimeString()}</small>
    </div>
  );
}
