
// icon
import { FaRobot } from "react-icons/fa";
export default function BotChatBubble({ children }) {
  return (
    <div>
      <div className="flex gap-1 justify-center items-center w-fit">
        <FaRobot className=" text-gray-500" />
        <span className="text-gray-500">Bot</span>
      </div>
      <div className="p-4 mr-auto dark:bg-gray-800 dark:text-slate-300 rounded-md shadow-lg w-fit max-w-[70%]">
        <p className="text-lg">{children}</p>
      </div>
    </div>

  )
}
