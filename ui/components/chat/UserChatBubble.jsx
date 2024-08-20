import React from "react";

export default function UserChatBubble({ children }) {
  return (
    <div className="p-4 ms-auto bg-[#F1F4FA] dark:bg-gray-800 dark:text-slate-300 rounded-md  shadow-md w-fit max-w-[70%]">
      <p className="text-lg">{children}</p>
    </div>
  );
}
