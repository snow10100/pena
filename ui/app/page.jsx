'use client';
import { useState } from "react";
import ChatInputField from "./components/chat/ChatInputField";
import UserChatBubble from "./components/chat/UserChatBubble";
import BotChatBubble from "./components/chat/BotChatBubble";

export default function Home() {
  const [userMessages, setUserMessages] = useState([]);
  const handleSubmit = (message) => {
    setUserMessages([...userMessages, message]);
    // we should also send the message to the server
    // we should also get a response from the server and added it to the messages
  }
  return (
    <main className="h-[90vh] sm:h-[95vh]">
      <div className="grid h-full grid-rows-2">
        <div className="overflow-y-auto">
          {/* This is the chat content area */}
          {/* <ChatContent /> */}
          {/* <UserChatBubble> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet provident nam, soluta optio, debitis, animi illum nesciunt dolorum quidem atque autem expedita dolorem earum quibusdam officia aspernatur perspiciatis id ex? </UserChatBubble> */}
          <div className="flex flex-col gap-2">
            {userMessages.map((message, index) => (
              <>
                <UserChatBubble key={index}>{message}</UserChatBubble>
                <BotChatBubble key={index}>{message}</BotChatBubble>
              </>
            ))}
          </div>

        </div>
        <div className="self-end">
          {/* This is the chat input field */}
          <ChatInputField handleSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}
