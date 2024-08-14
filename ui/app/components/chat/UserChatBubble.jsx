import React from "react";

export default function UserChatBubble({ children }) {
  return (
    <div className="p-4 ms-auto dark:bg-gray-800 dark:text-slate-300 rounded-3xl shadow-lg w-fit max-w-[70%]">
      <p className="text-lg">{children}</p>
    </div>
  );
}
