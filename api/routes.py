from fastapi import APIRouter

from schemas.request import Prompt_Body
from schemas.response import Report, healthResult
# from pathlib import Path, PurePath
router = APIRouter()

"""
    You have seen request.py & response.py, they are used here

    you can see there is POST /customers-count below with response_model=CustomerCount

    It has parameter of analyzer_info: AnalyzerInfo, which is the Request Body

    tags is used to tag endpoints, so they can be grouped together

    * Now you can run `python main.py` and try to access:*
    * http://localhost:8500/docs  OR http://localhost:8500/redoc*
"""

def generate_report_logic():
   pass




@router.get("/get-status", )

@router.get("/generate-report", response_model=Report, tags=["Report Endpoints"])
def generate_report():
    report = generate_report_logic()
    return {"data": report}

@router.post("/sth", tags=["General Endpoints"])
def sth(prompt_body: Prompt_Body):
    return {"result": "bla bla"}

@router.get("/health-check", response_model=healthResult, tags=["General Endpoints"])
def health_check():
    return {"response": {"status": "OK"}}

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(router, host="localhost", port=8000)
