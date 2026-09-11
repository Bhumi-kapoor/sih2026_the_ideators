from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="SATYA Safety Response Matrix API", version="1.0.0")

# Enable CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CounselorAssignmentRequest(BaseModel):
    chosen_counselor: str
    case_text: str

@app.get("/")
def read_root():
    return {"message": "SATYA Offline Security Matrix API is online."}

@app.post("/api/v1/process_audio")
async def process_audio(file: UploadFile = File(...)):
    """
    FEATURE 1: Accepts voice audio payload file and processes distress signal.
    """
    contents = await file.read()
    print(f"Received audio file: {file.filename}, size: {len(contents)} bytes")
    
    # Example Layer 4 response matrix payload
    return {
        "status": "success",
        "filename": file.filename,
        "layer_4_smart_action_routing": {
            "routing_action": {
                "incident_classification": "ACTIVE_EMERGENCY",
                "pcr_eta_minutes": 1.4,
                "dispatch_recommended": True
            }
        }
    }

@app.post("/api/v1/assign-counselor")
async def assign_counselor(payload: CounselorAssignmentRequest):
    """
    FEATURE 2: Accepts victim's selected counselor choice token.
    """
    print(f"Counselor Assigned: {payload.chosen_counselor} for case: {payload.case_text[:30]}...")
    return {
        "status": "success",
        "assigned_counselor": payload.chosen_counselor,
        "confirmation_code": "SATYA-CNSL-9021"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
