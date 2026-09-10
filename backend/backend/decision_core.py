import ollama
import json
import re

def calculate_distress_metrics(transcribed_text: str):
    """
    LAYER 3 Centralized Decision Core: High-security local triage processing.
    Includes deterministic rule catches for short high-danger emergency markers.
    """
    # Clean text for reliable string verification
    clean_text = transcribed_text.lower().strip()
    
    # 🚨 HARD TRIGGER RULE MATRIX: Catch short, immediate live crisis calls instantly
    live_crisis_keywords = ["emergency", "help me", "accident", "attack", "police", "ambulance"]
    if any(keyword in clean_text for keyword in live_crisis_keywords) and len(clean_text.split()) < 6:
        return {
            "distress_score": 95,
            "severity_score": 95,
            "incident_timeline": "ACTIVE",
            "primary_emergency_type": "POLICE",
            "justification": "Deterministic live crisis trigger activated based on high-threat keyword indicators."
        }

    system_prompt = (
        "You are the Centralized Decision Core of an emergency response platform named SATYA.\n"
        "Analyze the citizen distress text and output a strict JSON object.\n"
        "CRUCIAL DUAL-MODE ROUTING RULES:\n"
        "1. If the incident timeline is 'ACTIVE' (happening right now, e.g., 'emergency', 'help', 'right now') "
        "and involves an immediate crisis, you MUST set 'incident_timeline' to 'ACTIVE' and 'primary_emergency_type' to 'POLICE', 'AMBULANCE', or 'FIRE'.\n"
        "2. If the user mentions misbehavior, discrimination, or atrocities targeted at Scheduled Castes (SC) or Scheduled Tribes (ST), "
        "set 'primary_emergency_type' to 'SC_ST_ATROCITY' and timeline to 'HISTORICAL' unless it is happening right now.\n"
        "3. If the timeline is 'HISTORICAL' (past event) and involves personal trauma, set 'primary_emergency_type' to 'COUNSELING' and timeline to 'HISTORICAL'.\n"
        "Your response MUST be a valid JSON object matching this schema exactly:\n"
        "{\n"
        "  \"distress_score\": <integer 0-100>,\n"
        "  \"severity_score\": <integer 0-100>,\n"
        "  \"incident_timeline\": \"<ACTIVE | HISTORICAL>\",\n"
        "  \"primary_emergency_type\": \"<POLICE | FIRE | AMBULANCE | LEGAL_AID | COUNSELING | SC_ST_ATROCITY>\",\n"
        "  \"justification\": \"<brief 1-sentence reason>\"\n"
        "}"
    )

    try:
        response = ollama.chat(
            model='deepseek-r1:1.5b',
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f"Distress text input: {transcribed_text}"}
            ]
        )
        
        raw_content = response['message']['content']
        clean_content = re.sub(r'<think>.*?</think>', '', raw_content, flags=re.DOTALL).strip()
        
        if "```json" in clean_content:
            clean_content = clean_content.split("```json").split("```").strip()
        elif "```" in clean_content:
            clean_content = clean_content.split("```").split("```").strip()

        parsed_json = json.loads(clean_content)
        return parsed_json
        
    except Exception as e:
        return {
            "distress_score": 80,
            "severity_score": 75,
            "incident_timeline": "HISTORICAL",
            "primary_emergency_type": "COUNSELING",
            "justification": f"Fallback protection active: {str(e)}"
        }
