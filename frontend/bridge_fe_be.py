import requests

# 1. Base URL pointing to your live local FastAPI engine instance
BACKEND_BASE_URL = "http://127.0.0.1:8000/api/v1"

def process_voice_signal_to_backend(audio_file_path: str):
    """
    FRONTEND BRIDGE FEATURE 1: Pipes a local audio file recording directly 
    into SATYA's local 4-Layer diagnostic server engine via multi-part form data.
    """
    url = f"{BACKEND_BASE_URL}/process_audio"
    
    try:
        # Open and pack the binary file data into standard form headers
        with open(audio_file_path, "rb") as f:
            files = {"file": (audio_file_path, f, "audio/wav")}
            print(f"📡 Forwarding audio trace payload to {url}...")
            response = requests.post(url, files=files)
            
        if response.status_code == 200:
            # Return the full 4-Layer telemetry dictionary to your UI engine
            return response.json()
        else:
            print(f"❌ Backend returned error flag ({response.status_code}): {response.text}")
            return None
            
    except Exception as e:
        print(f"💥 Failed to establish connection bridge with local server: {e}")
        return None

def submit_counselor_override_to_backend(counselor_name: str, case_text: str):
    """
    FRONTEND BRIDGE FEATURE 2: Fires a JSON payload containing the victim's 
    hand-picked counselor choice back to the backend database lock route.
    """
    url = f"{BACKEND_BASE_URL}/assign-counselor"
    payload = {
        "chosen_counselor": counselor_name,
        "case_text": case_text
    }
    
    try:
        print(f"🔒 Dispatching user selection choice token for: {counselor_name}...")
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()
        return None
    except Exception as e:
        print(f"💥 Failed to dispatch selection handshake: {e}")
        return None

# --- LIVE CONNECTION TEST EXECUTION DRIVER ---
if __name__ == "__main__":
    # Target the sound file sitting inside your backend folder path wrapper
    sample_file = "backend/backend/distress_sample.wav"
    
    print("🎬 Initializing Frontend-to-Backend connection trace test...")
    result = process_voice_signal_to_backend(sample_file)
    
    if result:
        print("\n🎉 SUCCESS! Frontend successfully extracted server telemetry:")
        print(f"👉 Extracted Text: {result['layer_1_output']['extracted_text']}")
        print(f"👉 Timeline Mode:  {result['layer_3_decision_core']['triage_data']['incident_timeline']}")
        print(f"👉 Triage Mode:    {result['layer_4_smart_action_routing']['routing_action']['incident_classification']}")
    else:
        print("\n❌ Bridge Test Failed. Ensure uvicorn server is running on the left window panel.")
