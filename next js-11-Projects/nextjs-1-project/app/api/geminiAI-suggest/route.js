// app/api/geminiAI-suggest/route.js
export async function POST(req) {
  try {
    // Parse the incoming JSON body
    const { content } = await req.json();

    // Get your Gemini API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Call the Gemini API
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `You are a blog content suggestion AI. Suggest a catchy blog post idea in 1-2 lines based on the words and remember to expand only around 40 tokens and also do not start again or repeat the these words :- (${content}) just continue with the words or word given to you : ${content} .` },
                // { text: content },
              ]
            }
          ],
       
        }),
      }
    );


    const data = await res.json();
    console.log(data);
    // Extract the suggestion from the Gemini API response
    const suggestion =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion received.";

    // Return the suggestion as JSON
    return Response.json({ suggestion });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error generating suggestion:", error);
    return Response.json(
      { suggestion: "Error generating suggestion.", error: error.message },
      { status: 500 }
    );
  }
}
