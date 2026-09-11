import requests

url = "http://127.0.0.1:8000/api/v1/assign-counselor"  # Updated endpoint for counselor assignment

# Simulating the front-end payload when a victim selects Dr. Meenakshi Kaur from the UI menu list
user_selection_payload = {
    "chosen_counselor": "Dr. Meenakshi Kaur",
    "case_text": "I just want to tell you that last year something terrible happened with me..."
}

try:
    print(f"📡 Simulating User clicking choice on Antigravity Console Dashboard...")
    response = requests.post(url, json=user_selection_payload)
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ Antigravity UI Selection Handshake Successful!")
        print("=" * 65)
        print(f"🔒 Status:      {result['status']}")
        print(f"👉 Message:     {result['confirmation']['message']}")
        print(f"👉 Privacy Log: {result['confirmation']['compliance']}")
        print("=" * 65)
    else:
        print(f"❌ Selection Transfer Failed: {response.status_code} - {response.text}")
        
except Exception as e:
    print(f"💥 Network failed: {e}")
