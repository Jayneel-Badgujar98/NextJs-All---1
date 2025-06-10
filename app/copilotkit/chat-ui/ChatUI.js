// path : `app/copilotkit/chat-ui/ChatUI.js`
import { CopilotPopup } from "@copilotkit/react-ui";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { CopilotChat } from "@copilotkit/react-ui";
import '../../globals.css'
import { useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { useState } from "react";
import { useCopilotReadable } from "@copilotkit/react-core";
import ChatPersistenceProvider from "../ChatPersistenceProvider/page";
// copilot textarea to start next 

function DoNotAnswer() {
  useCopilotAdditionalInstructions({
    instructions: "Do not answer questions about the science.",
  });
  return null;
}

export const myMemory = `
Name: Jay Bad
Age: 18
Education: Learning BTech in Computer Science
Strengths: Fast learner, strong in web dev and DSA
Projects:
- PassOp (Password Manager) built in Next.js, deployed on Vercel
- Pinterest Clone using Express, MongoDB, EJS
- Music Course Website using JSON data in React
the recent project is passop website 
the link of passop website is - https://pass-op-password-manager-git-main-jayneel-badgujar98s-projects.vercel.app/
Technologies: React, Next.js, Tailwind CSS, MongoDB, Express.js, Node.js, EJS, CopilotKit, OpenRouter API
Goal: Crack FAANG by age 21–22
Languages: C++, C, Python, JavaScript
Current Focus: AI-powered apps with CopilotKit & OpenRouter
`;

function GeneralSuggestions() {
  useCopilotChatSuggestions([
    "What can you help me with?",
    "Summarize my notes",
    "Show me my todo list",
    "Tell me a fun fact"
  ]);
  return null;
}
export default function HomePage() {
  useCopilotReadable({
    description: "User's saved notes",
    value: myMemory,
  });
  useCopilotChatSuggestions(
    {
      instructions: "Suggest the most predictable next actions asking about jay bad.",
      minSuggestions: 2,
      maxSuggestions: 4,
    } // Pass your current todos as context
  );
  useCopilotAdditionalInstructions({
    instructions: "You are a gemini ai assistant model that answer questions as you are jay bad and answer only the questions which are related to jay bad.",
  });
  const [input, setInput] = useState("");

  return (
    <div
      style={{
        // "--copilot-kit-primary-color": "white",            // Rose-600 (main accent, e.g. buttons)
        // "--copilot-kit-contrast-color": "white",              // White text on primary
        // "--copilot-kit-background-color": "gray",         // Slate-50 (main background)
        // "--copilot-kit-secondary-color": "purple",             // Card/panel bg
        // "--copilot-kit-message-bg": "green", // Amber-400 (or any color you like)
        // "--copilot-kit-secondary-contrast-color": "white", // AI message text color
        // "--copilot-kit-separator-color": "green",          // Slate-200 (borders/dividers)
        // "--copilot-kit-muted-color": "blue",              // Slate-500 (muted/disabled)
        // "--copilot-kit-width": "1800px",                      // Sidebar width (optional)
      }}

      className=""
    >



      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">My AI Assistant</h1>
        <p>This is the first step of our CopilotKit setup!</p>
        {/* <CopilotTextarea // Ai autosuggestions in text area 
          className="w-full p-4 border text-black border-gray-300 rounded-md"
          value={input}
          onValueChange={setInput}
          autosuggestionsConfig={{
            textareaPurpose: "Composing a chat message to an assistant",
            chatApiConfigs: {
              maxTokens: 16,
              stop: [".", "?", "!"],
            },
          }}
        /> */}
        {/* Bubble UI Chat Assistant */}
        <ChatPersistenceProvider>


          <CopilotSidebar
            defaultOpen={true}
            instructions={"You are answering questions as if you are jay bad and you should only answer questions which are related to jay bad and not any others."}
            labels={{
              title: "AI Assistant",
              initial: "आज मी तुम्हाला कशी मदत करू शकतो ?",
            }}
            endpoint="/api/copilot/chat_2"


          >

            <GeneralSuggestions />
            {/* <CopilotPopup
          labels={{
            title: "Your Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
        /> */}
            {/* <CopilotChat
          instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
          labels={{
            title: "Your Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
        /> */}
          </CopilotSidebar>
        </ChatPersistenceProvider>
      </main>

    </div>
  );
}