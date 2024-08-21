from pydantic import BaseModel



"""
   Here we define the request schema, for example I will define the expected request body when a user creates a prompt:
    You can see below that the Request body will be like this: 
    {
        "prompt" : "do this and that",
        "target": "http://localhost:2000"
    }

    This class/model/schema will be used in routes.py, but let us see the response.py before, so let us jump there
"""
class Prompt_Body(BaseModel):
    prompt: str
    target: str
