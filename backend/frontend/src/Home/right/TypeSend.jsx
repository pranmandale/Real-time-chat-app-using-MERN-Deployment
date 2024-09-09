import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdSend } from "react-icons/io"; // Make sure this is imported if you are using it
import useSendMessage from "../../context/UseSendMessages"; // Verify this import path

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[10vh] bg-blue-300 items-center">
        <div className="w-[70%] px-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 mt-1 border border-gray-600 outline-none bg-slate-300 rounded-xl"
          />
        </div>
        <button type="submit" className="text-3xl">
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
