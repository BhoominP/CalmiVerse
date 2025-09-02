import React, { useState } from "react";
import { sendMessageToChatbot } from "../services/api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);

    // Call backend
    const res = await sendMessageToChatbot(input);

    // Add bot reply
    setMessages((prev) => [...prev, { sender: "bot", text: res.reply }]);

    setInput("");
  };

  return (
    <div className="chatbot-container p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">🤖 CalmiVerse Chatbot</h2>
      
      <div className="chat-box h-64 overflow-y-auto border p-2 mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <p key={i} className={msg.sender === "user" ? "text-blue-600" : "text-green-600"}>
            <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
          </p>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
