from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transcriber import transcribe_audio
import shutil
import os

# Initialize the backend API app engine
app = FastAPI(title="SATYA Layer 1: Voice Signal Extraction Engine")

# Enable Cross-Origin Resource Sharing (CORS) 
# This lets your Antigravity frontend interface securely talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/extract-voice")
async def extract_voice_signal(file: UploadFile = File(...)):
    # 1. Validate the incoming distress audio signal format
    if not file.filename.endswith(('.wav', '.mp3', '.ogg', '.m4a')):
        raise HTTPException(
            status_code=400, 
            detail="Invalid audio format. Please upload standard WAV, MP3, M4A, or OGG audio files."
        )
    
    # 2. Open up and cache incoming data into a temporary storage file
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        # 3. Call your Hugging Face transcriber code engine
        transcribed_text = transcribe_audio(temp_file_path)
        
        # 4. Clean up the disk cache file immediately
        os.remove(temp_file_path)
        
        # 5. Output the result to be consumed by Layer 2 (Text NLP & Indic Processing)
        return {
            "status": "success",
            "extracted_text": transcribed_text
        }
        
    except Exception as e:
        # Failsafe: Remove file cache if the transcription pipeline crashes
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(
            status_code=500, 
            detail=f"Layer 1 Processing Framework Failure: {str(e)}"
        )
