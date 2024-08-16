"use client";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ChatInputField from "./components/chat/ChatInputField";
import UserChatBubble from "./components/chat/UserChatBubble";
import BotChatBubble from "./components/chat/BotChatBubble";
import { RemoteRunnable } from "@langchain/core/runnables/remote";

// const fetcher = url => axios.post(url).then(res => res.data);

export default function Home() {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (message) => {
    setMessages([...messages, { message, sender: "user" }]);
    const index = messages.length - 1;
    const chain = new RemoteRunnable({
      url: `http://localhost:8000/ai/`,
    });
    try {
      console.log(messages);
      console.log("sending message:", messages[index].message);
      const response = await chain.invoke({
        task: messages[index].message,
      });
      const content = response.content;
      setMessages([...messages, { message: content, sender: "agent" }]);
      console.log(messages);
      console.log("response:", content);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const markdownContent = `
  # Hello World
 
  
# h1 Heading 

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

  This is a code block:

  \`\`\`javascript
  console.log('Hello, world!');
  \`\`\`


  ## Tables
 
  | Syntax | Description |
  | ----------- | ----------- |
  | Header | Title |
  | Paragraph | Text |
  
  `;

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
            <BotChatBubble>{markdownContent}</BotChatBubble>
          </div>
        </div>
      </div>
      <div className="self-end">
        <ChatInputField handleSubmit={handleSubmit} />
      </div>
    </main>
  );
}
