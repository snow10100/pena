"use client";
import { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ChatInputField({ handleSubmit }) {
  const [userPrompt, setUserPrompt] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  const handleChange = (e) => {
    setUserPrompt(e.target.value);
    // console.log("writing message", userPrompt);
  };

  const _handleSubmit = (message) => {
    if (message) {
      setUserPrompt("");
      handleSubmit(message);
    }
  };

  return (
    <div className="flex flex-row w-full p-2 bg-slate-100 rounded-lg dark:bg-gray-800 dark:text-white">
      <input
        className="bg-transparent text-lg mx-2 w-full rounded-full outline-none"
        type="text"
        placeholder="Send a Message"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            _handleSubmit(userPrompt);
          } 
        }}
        value={userPrompt}
      />
      <button
        className={`${disabledSubmit ? "bg-slate-200 cursor-not-allowed" : "hover:opacity-75 bg-custom-gradient"}  
        rounded-lg p-2`}
        onClick={() => _handleSubmit(userPrompt)}
      >
        <FaArrowUpLong className="text-white text-lg" />
      </button>
    </div>
  );
}
