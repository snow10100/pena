# main.py
import json
from typing import Annotated, TypedDict
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
    initial_state = {
            # "messages": [HumanMessage(content=query)],
            "messages": [{"type": "human", "content": query}],
            "model_status": "scanning",
            }
    for chunk in graph.stream(initial_state, stream_mode="updates"):
        for node_name, node_results in chunk.items():
            # print(node_results)
            chunk_messages = node_results.get("messages", [])
            model_status = node_results.get("model_status", [])
            for message in chunk_messages:
                if not message['content']:
                    continue
                # if isinstance(message, ToolMessage):
                #     event_str = "event: tool_event"
                else:
                    event_str = "event: ai_event"
                # data_str = f"data: {message.content}"
                # data_str += f"model_status: {model_status}"
                data_str = 'data: ' + json.dumps(node_results)
                # print(f"{event_str}\n{data_str}\n\n")
                yield f"{event_str}\n{data_str}\n\n"
            

@app.post("/stream")
async def stream(query: Annotated[str, Body(embed=True)]):
    return StreamingResponse(event_stream(query), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
