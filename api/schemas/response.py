from pydantic import BaseModel
from typing import Dict
from datetime import datetime


"""
    Here I modeled the response for the /generate-report endpoint
    As you can see the response will be like this:
    {
        "data" : {
            {
            "text": "bla bla",
            "format": "latex"
            }
        }
    }

    Now let us jump to routes.py
"""
class Report(BaseModel):
    data: Dict[str, str] = {"text": "bla bla",
            "format": "latex"}

class healthResult(BaseModel):
    response: dict = {"status": "OK"}