import React, { useEffect, useState } from "react";
import { listMessages } from "./appwrite";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);

  async function fetchMessages() {
    const response = await listMessages();

    if (response.success) {
      setMessages(response.data);
      console.log("got messages ->", response.data);
    } else {
      alert(`Failed to fetch messages Error - ${response.error}`);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

    function formatTime(fullUtc){
  const date = new Date(fullUtc);

const local = date.toLocaleString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

console.log('local>', local);


return local
}

  return (
    <div className="w-full min-h-screen bg-gray-950 text-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        📩 All Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-gray-400 text-center">No messages found.</p>
      ) : (
        <div className="messages-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="message-entry w-full bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-3">
                <p className="text-sm text-gray-400">📧 {message.$createdAt.split("T")[0]+" - "+formatTime(message.$createdAt)}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-400">📧 {message.email}</p>
              </div>
              <h2 className="text-lg font-semibold text-white">
                {message.name}
              </h2>
              <h3 className="text-sm text-indigo-400 font-medium">
                {message.subject}
              </h3>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMessages;
