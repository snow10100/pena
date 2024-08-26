#!/usr/bin/env python

import os
from dotenv import load_dotenv
load_dotenv()

import os
import json
from rich import print
from typing_extensions import Annotated, TypedDict

from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage, ToolMessage

from lg_pentest.pentest_agent.agent import pentest_graph


app = FastAPI(
    title="BreachSeek",
    version="1.0",
    description="Pentester AI Agents",
)

# so that we can run in our browser
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
            "messages": [{"type": "human", "content": query}],
            "findings": {
                "critical": ['4 vulnerabilities'],
                "medium": ['11 open ports'],
                },
            "command": "nmap -sV -sC -p- -oN metasploitable2_scan.txt 192.168.100.231",
            "model_status": "scanning",
            "evaluation": "wow",
            }
    for chunk in pentest_graph.stream(initial_state, stream_mode="updates"):
        for node_name, node_results in chunk.items():
            print(f'{node_name = }')
            node_results['agent'] = node_name
            print(node_results)
            chunk_messages = node_results.get("messages", [])
            model_status = node_results.get("model_status", [])
            for message in chunk_messages:
                if not message['content']:
                    continue
                if isinstance(message, ToolMessage):
                    continue
                if message['type'] == 'tool_calls':
                    event_str = "event: tool_event"
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
