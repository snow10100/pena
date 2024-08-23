// StreamComponent.jsx

import React, { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import BotChatBubble from "../../components/chat/BotChatBubble.jsx"

function StreamComponent({message}) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource("http://localhost:8000/stream", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ query: message }),
        onmessage(ev) {
          console.log(`Received event: ${ev.data}`); // for debugging purposes
          setMessages((prev) => [...prev, ev.data]);
        },
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <BotChatBubble>
        {messages.join(" ")}
      </BotChatBubble>
    </div>
  );
}

export default StreamComponent;
