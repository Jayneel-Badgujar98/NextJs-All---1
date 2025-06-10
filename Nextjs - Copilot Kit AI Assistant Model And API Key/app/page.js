// 'use client';

// import { useState } from 'react';
// import { CopilotKit } from '@copilotkit/react-core';
// import { CopilotTextarea } from '@copilotkit/react-textarea';
// import { useEffect, useRef } from 'react';


// export default function Home() {

//   const messagesEndRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
//     // if (storedMessages) {
//     setMessages(storedMessages);
//     // }
//   }, []);

//   const handleSubmit = async () => {
//     const userMessage = input.trim();
//     if (!userMessage) return;

//     const newMessages = [...messages, { role: 'user', content: userMessage }];
//     setMessages(newMessages);
//     setInput('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:3000/api/copilotkit/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
//           // 'HTTP-Referer': 'http://localhost:3000',
//           // 'X-Title': 'Copilot Chat Demo',
//         },
//         body: JSON.stringify({
//           // model: 'deepseek/deepseek-chat-v3-0324:free',
//           model: "meta-llama/llama-3.3-8b-instruct:free",
//           messages: newMessages,
//         }),
//       });

//       const data = await res.json();
//       console.log("API Response: ", data); // Add this line

//       const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
//       const updatedMessages = [...newMessages, { role: 'assistant', content: reply }];
//       setMessages(updatedMessages);
//       localStorage.setItem('messages', JSON.stringify(updatedMessages)); // ✅ inside try
//     } catch (error) {
//       console.error('Fetch error:', error);
//       const newMessages = [...messages, { role: 'assistant', content: error.message || 'An error occurred. Please try again.' }];
//       setMessages(newMessages);
//       localStorage.setItem('messages', JSON.stringify(newMessages)); // ✅ inside try
//     }
//     setLoading(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault(); // Prevent new line
//       handleSubmit();
//     }
//   };

//   return (
//     <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}>
//       <main className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
//         <div className="w-full max-w-2xl bg-black p-6 rounded-2xl shadow-xl border border-gray-300">
//           <h1 className="text-3xl font-bold text-center text-slate-900 mb-6">🧠 Smart AI Chatbot</h1>

//           <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 px-2">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`relative group max-w-[80%] px-4 py-2 rounded-xl text-base whitespace-pre-wrap ${msg.role === 'user'
//                   ? 'ml-auto bg-indigo-200 text-gray-900'
//                   : 'mr-auto bg-green-200 border border-gray-300 text-gray-900'
//                   }`}
//               >
//                 {msg.content}
//                 <button
//                   onClick={() => navigator.clipboard.writeText(msg.content)}
//                   className="absolute right-2 top-2 text-gray-800 group-hover:block"
//                 >
//                   <span className="absolute -top-6 right-0 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
//                     Copy
//                   </span>
//                   <span className="material-symbols-outlined">
//                     content_copy
//                   </span>
//                 </button>

//               </div>
//             ))}
//             {loading && (
//               <div className="mr-auto bg-white border border-gray-300 text-gray-500 px-4 py-2 rounded-xl max-w-[80%]">
//                 Typing...
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="flex flex-col gap-2">
//             <CopilotTextarea
//               className="w-full border border-gray-400 cursor-pointer text-black bg-blue-300 rounded-md p-3 resize-none"
//               placeholder="Ask anything..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//             />
//             <button
//               onClick={handleSubmit}
//               className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Send'}
//             </button>
//           </div>
//         </div>
//       </main>
//     </CopilotKit>
//   );
// }

// 

// app/page.jsx
'use client';
import ChatUI from './copilotkit/chat-ui/ChatUI';
import RedirectAction from './copilotkit/actions/RedirectAction';
import JokesAction from './copilotkit/actions/JokesAction';
import FetchWeatherAction from './copilotkit/actions/FetchWeatherAction';
import ConsoleEssay from './copilotkit/actions/ConsoleEssay';
import SummaryAction from './copilotkit/actions/SummaryAction';
import EmailWritingAction from './copilotkit/actions/EmailWritingAction';
import TodoAction from './copilotkit/actions/TodoAction';

export default function HomePage() {
  return (
    <main>
      <EmailWritingAction />
      <RedirectAction />
      <ConsoleEssay />
      <JokesAction />
      <FetchWeatherAction />
      <SummaryAction />
      <TodoAction />
      <ChatUI />
    </main>
  );
}
