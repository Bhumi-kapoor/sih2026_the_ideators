import requests
import json

# Aligned with your standard process_audio route path
url = "http://127.0.0.1:8000/api/v1/process_audio"
audio_file_path = "distress_sample2.wav"

try:
    print(f"🚀 Sending audio payload [{audio_file_path}] to SATYA Engine...")
    with open(audio_file_path, "rb") as audio_file:
        files = {"file": (audio_file_path, audio_file, "audio/wav")}
        response = requests.post(url, files=files)
        
    if response.status_code == 200:
        result = response.json()
        print("\n✅ SATYA Full 4-Layer Architecture Execution Successful!")
        print("=" * 70)
        
        # 🗣️ LAYER 1 OUTPUT PRINT WINDOW
        print(f"🗣️ [LAYER 1] Text Extraction:")
        print(f"   👉 {result['layer_1_output']['extracted_text']}")
        print("-" * 70)
        
        # 🧠 LAYER 2 OUTPUT PRINT WINDOW
        print(f"🧠 [LAYER 2] MuRIL Vector Dimensions:")
        print(f"   👉 {result['layer_2_output']['metrics']['embedding_shape']}")
        print("-" * 70)
        
        # 🛡️ LAYER 3 OUTPUT PRINT WINDOW
        triage = result['layer_3_decision_core']['triage_data']
        print(f"🛡️ [LAYER 3] DeepSeek Assessment Metrics:")
        print(f"   👉 Timeline Status:  【{triage.get('incident_timeline')}】")
        print(f"   👉 Emergency Sector: 【{triage.get('primary_emergency_type')}】")
        print(f"   👉 Distress Score:    {triage.get('distress_score')}/100")
        print("-" * 70)
        
        # ⚡ LAYER 4 OUTPUT PRINT WINDOW
        routing = result['layer_4_smart_action_routing']['routing_action']
        print("⚡ [LAYER 4] Smart Action Fleet Triage Routing Parameters:")
        print(f"   👉 Operational Mode:       {routing.get('incident_classification')}")
        print(f"   👉 Dispatch Action Sector:  {routing.get('action_sector')}")
        print(f"   👉 Active Siren Alerted:   {routing.get('requires_immediate_siren_alert')}")
        print(f"   👉 Telemetry Routing Data: {json.dumps(routing.get('dispatch_telemetry'), indent=6)}")
        print("=" * 70)
    else:
        print(f"❌ Server Error ({response.status_code}): {response.text}")

except FileNotFoundError:
    print(f"📁 Error: Could not find '{audio_file_path}'. Please make sure it is in this folder!")
except Exception as e:
    print(f"💥 Request failed: {e}")
