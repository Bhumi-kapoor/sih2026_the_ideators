from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transcriber import transcribe_audio
from nlp_engine import analyze_text_embeddings  # <-- Placed correctly at the top
import shutil
import os

app = FastAPI(title="SATYA Unified Engine: Layers 1 & 2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/extract-voice")
async def extract_voice_signal(file: UploadFile = File(...)):
    if not file.filename.endswith(('.wav', '.mp3', '.ogg', '.m4a')):
        raise HTTPException(
            status_code=400, 
            detail="Invalid audio format. Please upload standard WAV, MP3, M4A, or OGG files."
        )
    
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        # LAYER 1: Extract text from the audio waves using Whisper
        transcribed_text = transcribe_audio(temp_file_path)
        os.remove(temp_file_path)
        
        # LAYER 2: Pipe that text instantly into MuRIL for Indic NLP Processing
        nlp_analysis = analyze_text_embeddings(transcribed_text)
        
        # Combined Unified API Response
        return {
            "status": "success",
            "layer_1_output": {
                "extracted_text": transcribed_text
            },
            "layer_2_output": {
                "nlp_status": "Context vector generated successfully",
                "metrics": nlp_analysis
            }
        }
        
    except Exception as e:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(
            status_code=500, 
            detail=f"Pipeline Failure: {str(e)}"
        )
