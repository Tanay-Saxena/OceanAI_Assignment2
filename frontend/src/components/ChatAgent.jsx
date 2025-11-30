// frontend/src/components/ChatAgent.jsx

import { useState } from "react";

export default function ChatAgent({ onAsk, reply }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onAsk(input);     // send question to parent
    setInput("");      // clear input
  };

  return (
    <div className="w-[360px] bg-white rounded-xl shadow-md p-4 border border-gray-200 h-[90vh] flex flex-col">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Email Agent Chat</h2>

      {/* CHAT OUTPUT AREA */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-3 rounded-lg border">

        {reply ? (
          <p className="text-gray-800 whitespace-pre-line">{reply}</p>
        ) : (
          <p className="text-gray-500 text-sm">
            Ask things like:
            <br />• “Summarize this email”
            <br />• “What tasks do I need to do?”
            <br />• “Draft a friendlier reply”
          </p>
        )}

      </div>

      {/* INPUT BAR */}
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Ask the email agent..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
