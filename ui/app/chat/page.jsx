"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ChatInputField from "../../components/chat/ChatInputField";
import UserChatBubble from "../../components/chat/UserChatBubble";
import BotChatBubble from "../../components/chat/BotChatBubble";
import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { useSearchParams } from "next/navigation";
import { fetchEventSource } from "@microsoft/fetch-event-source";



// const fetcher = url => axios.post(url).then(res => res.data);

const chain = new RemoteRunnable({
  url: `http://localhost:8000/graph/`,
});
const markdownContent = `
  # Hello World
 
  
# h1 Heading 
**This is bold text**
__This is bold text__
*This is italic text*
_This is italic text_
~~Strikethrough~~
  This is a code block:
  \`\`\`cli
  ls
  \`\`\`
  ## Tables
 
  | Syntax | Description |
  | ----------- | ----------- |
  | Header | Title |
  | Paragraph | Text |
  
  `;



export default function Home() {
  const [messages, setMessages] = useState([]);
  const [tempMessage, setTempMessage] = useState("");
  const [tempMessages, setTempMessages] = useState([]);
  const [runningCommands, setRunningCommands] = useState([]);
  const searchParams = useSearchParams();
  const target = searchParams.get('target');
  const task = searchParams.get('task');

  // TODO: set model status as a context

  const fetchData = async (message) => {
    await fetchEventSource("http://localhost:8000/stream", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ query: message }),
      onmessage: (ev) => {
        console.log(ev.event);
        console.log(ev.data);
        const obj = JSON.parse(ev.data);
        console.log(`ev: ${ev}`);
        console.log("ev stringfied", obj.messages);
        console.log(`Received event: ${ev.data}`); // for debugging purposes
        console.log(`Received event: ${JSON.stringify(obj.messages)}`); // for debugging purposes
        console.log(`Received content: ${obj.messages[obj.messages.length - 1].content}`); // for debugging purposes
        setMessages((prev) => [...prev, obj.messages[obj.messages.length - 1]]);
      },
    });
  };

  useEffect(() => {
    if (target || task) {
      let message = `Perform this task: ${task}`;
      if (target) {
        message += ` on this target: ${target}`;
      }
      handleSubmit(message);
    }
  }, [target, task]);

  useEffect(() => {}, [tempMessages])


  // const handleSubmit = async (message) => {
  //   if (!message) {
  //     return;
  //   }
  //   const messageHistory = [...messages, { message: message, sender: "user" }];
  //   setMessages(messageHistory);
  //   try {
  //     fetchData(message);
  //     const bot_message = tempMessages.join(" ")
  //     setTempMessages([]);
  //     setMessages([...messageHistory, { message: bot_message, sender: "agent" }]);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  const handleSubmit = async (message) => {
    if (!message) {
      return;
    }
    const newMessage = { type: "human", content: message };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    try {
      await fetchData(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
    
  return (
    <main className="h-[85vh] sm:h-[90vh]">
      <div className="grid h-full grid-rows-[1fr, auto]">
        <div className="overflow-y-auto mb-2">
          <div className="flex flex-col gap-3">
            {messages.map((message, index) =>
              message.type === "human" ? (
                <UserChatBubble key={`user-${index}`}>
                  {message.content}
                </UserChatBubble>
              ) : (
                <BotChatBubble key={`bot-${index}`}>
                  {message.content}
                </BotChatBubble>
              )
            )}
          </div>
        </div>
      </div>
      <div className="self-end">
        <ChatInputField handleSubmit={handleSubmit} />
      </div>
    </main>
  );
}

