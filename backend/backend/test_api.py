import requests

# 1. Point this to your live FastAPI endpoint URL
url = "http://127.0.0"

# 2. Path to your sample audio recording file
# Make sure to drop a test .wav or .mp3 file into this exact folder!
audio_file_path = "distress_sample.wav"

try:
    print(f"🚀 Sending audio payload [{audio_file_path}] to SATYA Engine...")
    
    # Open the file in binary read mode
    with open(audio_file_path, "rb") as audio_file:
        files = {"file": (audio_file_path, audio_file, "audio/wav")}
        
        # Post request payload block
        response = requests.post(url, files=files)
        
    # Check server response status code
    if response.status_code == 200:
        result = response.json()
        print("\n✅ Layer 1 Voice Extraction Successful!")
        print("-" * 40)
        print("🗣️ Extracted Text Output:")
        print(result["extracted_text"])
        print("-" * 40)
    else:
        print(f"❌ Server Error ({response.status_code}): {response.text}")

except FileNotFoundError:
    print(f"📁 Error: Could not find the file '{audio_file_path}'. Please add a test audio file to this folder!")
except Exception as e:
    print(f"💥 Request failed: {e}")
