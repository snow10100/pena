import operator
from typing import Annotated, Sequence

from langgraph.graph import END, StateGraph
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage
from langchain_core.pydantic_v1 import BaseModel


class MyAppState(BaseModel):
    messages: Annotated[Sequence[BaseMessage], operator.add]


graph_builder = StateGraph(MyAppState)
model = ChatAnthropic(model='claude-3-5-sonnet-20240620')

def brainstorm(state: MyAppState):
    brainstorming_prompt = (
        "You are a helpful assistant. Brainstorm one idea given the user's input. "
        "Your idea will be turned into a blog by an AI system, keep it short."
    )
    user_message = state.messages[-1]
    response = model.invoke([SystemMessage(content=brainstorming_prompt), HumanMessage(content=user_message.content)])
    return {"messages": [response]}


def write_outline(state: MyAppState):
    outlining_prompt = (
        "Write an outline for a short article given a prompt by the user. A brainstorming AI was used to elaborate"
    )
    response = model.invoke([SystemMessage(content=outlining_prompt), *state.messages])
    return {"messages": [response]}


def write_article(state: MyAppState):
    writing_prompt = "Write a short article following an outline of the user's prompt."
    response = model.invoke([SystemMessage(content=writing_prompt), *state.messages])
    return {"messages": [response]}


graph_builder.add_node("brainstorm", brainstorm)
graph_builder.add_node("write_outline", write_outline)
graph_builder.add_node("write_article", write_article)

graph_builder.add_edge("brainstorm", "write_outline")
graph_builder.add_edge("write_outline", "write_article")
graph_builder.add_edge("write_article", END)

graph_builder.set_entry_point("brainstorm")

graph = graph_builder.compile()
