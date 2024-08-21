// StreamComponent.jsx

import React, { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

function StreamComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource("http://localhost:8000/stream", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ query: "oxford" }),
        onmessage(ev) {
          console.log(`Received event: ${ev.event}`); // for debugging purposes
          setMessages((prev) => [...prev, ev.data]);
        },
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}

export default StreamComponent;
