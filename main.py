from rich import print
import os
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
from langchain_community.tools import ShellTool
from langchain_experimental.tools import PythonREPLTool
from langchain_mistralai import ChatMistralAI
from langchain_groq import ChatGroq

model = ChatMistralAI(model='mistral-large-latest')
#model = ChatGroq(model='llama-3.1-8b-instant')

#shell_tool = ShellTool(ask_human_input=True)
shell_tool = ShellTool()
# python_tool = PythonREPLTool(ask_human_input=True)
tools = [shell_tool] #, python_tool]

system_message = 'you can run bash commands using shell_tool, you are helping students learn how to pentest metasploitable 2'# or python code using python_tool'
app = create_react_agent(model, tools, state_modifier=system_message)

print('[red]what do you want to do?[/red]', end=' ')
query = input()

out = app.invoke({"messages": [("human", query)]})
print(out['messages'][-1].content)
