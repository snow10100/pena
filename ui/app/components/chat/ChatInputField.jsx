"use client";
import { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ChatInputField({ handleSubmit }) {
  const [userPrompt, setUserPrompt] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const handleChange = (e) => {
    setUserPrompt(e.target.value);
    console.log("writing message", userPrompt);
  }
  const buttonStyle = {
    background: 'linear-gradient(to right, #5976F9, #04A5D3)',
  };


  return (
    <div className="flex flex-row w-full p-2 bg-slate-100 rounded-lg dark:bg-gray-800 dark:text-white">
      <input
        className="bg-transparent text-lg mx-2 w-full rounded-full outline-none"
        type="text"
        placeholder="Send a Message"
        onChange={handleChange}
      />
      <button className={disabledSubmit ? "bg-slate-400 rounded-lg p-2" : "rounded-lg p-2"} onClick={() => handleSubmit(userPrompt)}
        style={disabledSubmit ? "" : buttonStyle}
      >
        <FaArrowUpLong className="text-white text-lg" />
      </button>
    </div>
  );
}
