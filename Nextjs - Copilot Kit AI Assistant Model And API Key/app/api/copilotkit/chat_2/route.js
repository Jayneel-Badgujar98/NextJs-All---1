// path: app/api/copilotkit/chat_2/route.js
// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "HTTP-Referer": "http://localhost:3000",
//         "X-Title": "Copilot AI App",
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-chat-v3-0324:free",
//         messages: body.messages,
//       }),
//     });

//     if (!res.ok) {
//       const err = await res.text();
//       return new Response(JSON.stringify({ error: err }), { status: res.status });
//     }

//     // Pass through the OpenRouter response as-is
//     const data = await res.json();
//     return Response.json(data);

//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Something went wrong!" }), { status: 500 });
//   }
// }
import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env["GOOGLE_API_KEY"]);
const serviceAdapter = new GoogleGenerativeAIAdapter({
  model: "gemini-2.0-flash", // Use the model you prefer
});

const runtime = new CopilotRuntime();

export const POST = async (req) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit/chat_2",
  });

  return handleRequest(req);
};
