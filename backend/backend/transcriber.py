import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

def transcribe_audio(audio_file_path):
    # 1. Select hardware layout (Uses GPU if available for faster hackathon speeds)
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    # 2. Specify the model engine (Using Whisper-Small for high accuracy on Indian dialects)
    model_id = "openai/whisper-small"

    # 3. Download and load the AI engine and data processor from Hugging Face
    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
    )
    model.to(device)
    processor = AutoProcessor.from_pretrained(model_id)

    # 4. Assemble the Automatic Speech Recognition (ASR) pipeline
    asr_pipeline = pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        torch_dtype=torch_dtype,
        device=device,
    )

    # 5. Run the audio through the processing engine
    print(f"Processing audio signal: {audio_file_path}...")
    result = asr_pipeline(
        audio_file_path, 
        generate_kwargs={"max_new_tokens": 256}
    )
    
    return result["text"]
