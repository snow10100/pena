"use client";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ChatInputField from "../../components/chat/ChatInputField";
import UserChatBubble from "../../components/chat/UserChatBubble";
import BotChatBubble from "../../components/chat/BotChatBubble";
import { RemoteRunnable } from "@langchain/core/runnables/remote";

// const fetcher = url => axios.post(url).then(res => res.data);

const chain = new RemoteRunnable({
  url: `http://localhost:8000/ai/`,
});


export default function Home() {
  const [messages, setMessages] = useState([]);
  const [tempMessage, setTempMessage] = useState("");

  const handleSubmit = async (message) => {
    if (!message) {
      return;
    }
    const messageHistory = [...messages, { message: message, sender: "user" }];
    setMessages(messageHistory);
    try {
      const response = await chain.stream({ task: message });
      var bot_message = '';
      for await (const chunk of response) {
        bot_message += chunk.content;
        setTempMessage(bot_message);
      }
      setTempMessage('');
      setMessages([...messageHistory, { message: bot_message, sender: "agent" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    console.log(messages);
  };

  return (
    <main className="h-[85vh] sm:h-[90vh]">
      <div className="grid h-full grid-rows-[1fr, auto]">
        <div className=" overflow-y-auto">
          <div className="flex flex-col gap-3">
            {messages.map((message, index) =>
              message.sender === "user" ? (
                <UserChatBubble key={`user-${index}`}>
                  {message.message}
                </UserChatBubble>
              ) : (
                <BotChatBubble key={`bot-${index}`}>
                  {message.message}
                </BotChatBubble>
              )
            )}
            {tempMessage && <BotChatBubble>{tempMessage}</BotChatBubble>}
          </div>
        </div>
      </div>
      <div className="self-end">
        <ChatInputField handleSubmit={handleSubmit} />
      </div>
    </main>
  );
}
