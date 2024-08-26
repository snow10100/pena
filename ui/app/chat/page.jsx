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
import { useModelContext } from "../../hooks/ModelContext";

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
  const target = searchParams.get("target");
  const task = searchParams.get("task");

  const {
    modelStatus,
    setModelStatus,
    modelSummary,
    setModelSummary,
    setModelFindings,
    modelCommands,
    setModelCommands,
  } = useModelContext();

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
        console.log(
          `Received content: ${obj.messages[obj.messages.length - 1].content}`
        ); // for debugging purposes
        const Model_status = obj.current_step || obj.agent;
        setModelStatus(Model_status == "__end__" ? "Done" : Model_status);

        // TODO:
        // setModelSummary();

        // get the findings from the model
        const findings = obj.findings;
        if (findings) {
          // TODO: reset the findings? or append new findings? or update changed findings?
          setModelFindings(findings);
        }

        // get the command that are running
        const runningCommand = obj.command;
        if (runningCommand) {
          setModelCommands([runningCommand]);
        }

        if (obj.agent == "tools_node") {
          obj.agent = "pentester";
        }
        setMessages((prev) => [...prev, obj]);
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

  useEffect(() => {}, [tempMessages]);

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

    // Update the chat window with the new message
    const newMessage = { type: "human", content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // send the message to the server
    fetchData(message)
      .then((response) => {
        // TODO: logic with response if needed

        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // scroll to the bottom of the chat window when a new message is added
  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
    <main className="h-[85vh] sm:h-[90vh]">
      <div className="grid h-full grid-rows-[1fr, auto]">
        <div id="chat-window" className="overflow-y-auto mb-2">
          <div className="flex flex-col gap-3">
            {messages.map((message, index) =>
              message.type === "human" ? (
                <UserChatBubble key={`user-${index}`}>
                  {message.content}
                </UserChatBubble>
              ) : (
                // message here is actually the entire object, sorry for the confusion but no time :)
                <BotChatBubble
                  key={`bot-${index}`}
                  bot_name={message.agent || ""}
                >
                  {message.messages[message.messages.length - 1].content}
                </BotChatBubble>
              )
            )}
          </div>
        </div>
      </div>
      <div className="self-end mt-2">
        <ChatInputField handleSubmit={handleSubmit} />
      </div>
    </main>
  );
}
