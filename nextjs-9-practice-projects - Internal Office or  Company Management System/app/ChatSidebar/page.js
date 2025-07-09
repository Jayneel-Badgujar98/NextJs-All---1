
"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket;

export const ChatSidebar = ({ open, setOpen }) => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      setName(storedName || "");
    }
  }, []);

  useEffect(() => {
    socket = io();

    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, { ...msg, type: "received" }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;
    const msgData = {
      text: message,
      sender: name || "Anonymous",
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send-message", msgData);
    setMessages((prev) => [...prev, { ...msgData, type: "sent" }]);
    setMessage("");
  };

  return (
    <>


      <div className={`fixed bottom-0 right-0 w-full max-w-md h-[75%] bg-[#18181b] shadow-xl z-50 flex flex-col border-t border-l border-gray-700 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-gray-100">Staff Chat</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white"
            title="Close"
          >
            ✖️
          </button>
        </div>
        <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.type === "sent"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-700 text-gray-100"
                }`}
            >
              <div className="text-xs opacity-70 mb-1">{msg.sender} • {msg.time}</div>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>

    </>
  );
};

