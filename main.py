#!/usr/bin/env python
from fastapi import FastAPI
from rich import print
import os
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
from langchain_community.tools import ShellTool, HumanInputRun
from langchain_experimental.tools import PythonREPLTool
# from langchain_mistralai import ChatMistralAI
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
# from langchain_groq import ChatGroq
from langserve import add_routes

from fastapi.middleware.cors import CORSMiddleware

# Set all CORS enabled origins

# model = ChatMistralAI(model='mistral-large-latest')
# model = ChatGroq(model='llama-3.1-8b-instant')
model = ChatAnthropic(model='claude-3-haiku-20240307')


shell_tool = ShellTool()
human_input = HumanInputRun()
# shell_tool = ShellTool()
# python_tool = PythonREPLTool(ask_human_input=True)
tools = [shell_tool, human_input] #, python_tool]

system_message = 'you can run bash commands using shell_tool, you can ask for human input using human_input, you are helping students learn how to pentest metasploitable 2'# or python code using python_tool'
agent = create_react_agent(model, tools, state_modifier=system_message)

prompt = ChatPromptTemplate.from_template('perform the following task: {task}')
# print('[red]what do you want to do?[/red]', end=' ')
# query = input()

# out = app.invoke({"messages": [("human", query)]})
# print(out['messages'][-1].content)

app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

add_routes(
    app,
    prompt | agent,
    path="/ai",
)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)
