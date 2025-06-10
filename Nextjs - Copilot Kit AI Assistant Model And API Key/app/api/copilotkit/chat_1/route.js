// path: app/api/copilotkit/chat_1/route.js
export async function POST(req) {
  const body = await req.json();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:3000", // Replace with your domain in production
      "X-Title": "Copilot AI App",
    },
    body: JSON.stringify({
      model: body.model,
      messages: body.messages,
    }),
  });

  const stream = await res.json();
  return Response.json(stream)
}