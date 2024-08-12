import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";

export default function ChatInputField() {
  return (
    <div className="flex flex-row w-full p-2 bg-slate-100 rounded-lg dark:bg-gray-800 dark:text-white">
      <input
        className="bg-transparent text-lg mx-2 w-full rounded-full outline-none"
        type="text"
        placeholder="Send a Message"
      />
      <button className="bg-slate-400 rounded-lg p-2">
        <FaArrowUpLong className="text-white text-lg" />
      </button>
    </div>
  );
}
