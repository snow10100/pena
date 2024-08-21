# main.py

from typing import Annotated
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
import time
from langchain_core.messages import HumanMessage, ToolMessage
from fastapi.middleware.cors import CORSMiddleware
from my_app.llm_flow import graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

def event_stream(query: str):
    # Sends an event every second with data: "Message {i}"
    initial_state = {"messages": [HumanMessage(content=query)]}
    for chunk in graph.stream(initial_state):
        for node_name, node_results in chunk.items():
            chunk_messages = node_results.get("messages", [])
            for message in chunk_messages:
                if not message.content:
                    continue
                if isinstance(message, ToolMessage):
                    event_str = "event: tool_event"
                else:
                    event_str = "event: ai_event"
                data_str = f"data: {message.content}"
                yield f"{event_str}\n{data_str}\n\n"

@app.post("/stream")
async def stream(query: Annotated[str, Body(embed=True)]):
    return StreamingResponse(event_stream(query), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
