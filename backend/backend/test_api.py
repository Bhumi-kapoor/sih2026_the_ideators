import requests

url = "http://127.0.0.1:8000/api/v1/process_audio"
audio_file_path = "distress_sample.wav"

try:
    print(f"🚀 Sending audio payload [{audio_file_path}] to SATYA Engine...")
    
    with open(audio_file_path, "rb") as audio_file:
        files = {"file": (audio_file_path, audio_file, "audio/wav")}
        response = requests.post(url, files=files)
        
    if response.status_code == 200:
        result = response.json()
        print("\n✅ SATYA Privacy Architecture Execution Successful!")
        print("=" * 60)
        
        # 🗣️ LAYER 1 OUTPUT PRINT
        print("🗣️ [LAYER 1] Extracted Voice Text:")
        print(f"   👉 {result['layer_1_output']['extracted_text']}")
        print("-" * 60)
        
        # 🧠 LAYER 2 OUTPUT PRINT
        print("🧠 [LAYER 2] MuRIL Indic NLP Processing Metrics:")
        print(f"   👉 Embedding Tensor Dimensions: {result['layer_2_output']['metrics']['embedding_shape']}")
        print("-" * 60)
        
        # 🛡️ LAYER 3 OUTPUT PRINT (This was missing!)
        triage = result['layer_3_decision_core']['triage_data']
        print("🛡️ [LAYER 3] Localized DeepSeek Decision Core Outputs:")
        print(f"   👉 Primary Emergency Sector: 【{triage.get('primary_emergency_type')}】")
        print(f"   👉 Calculated Distress Score: {triage.get('distress_score')}/100")
        print(f"   👉 System Severity Level:    {triage.get('severity_score')}/100")
        print(f"   👉 System Justification:     {triage.get('justification')}")
        print("=" * 60)
    else:
        print(f"❌ Server Error ({response.status_code}): {response.text}")

except FileNotFoundError:
    print(f"📁 Error: Could not find the file '{audio_file_path}'.")
except Exception as e:
    print(f"💥 Request failed: {e}")
