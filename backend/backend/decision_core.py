import ollama
import json
import re

def calculate_distress_metrics(transcribed_text: str):
    """
    LAYER 3 Centralized Decision Core: Uses local DeepSeek-R1 to analyze
    distress levels completely offline with maximum data privacy.
    """
    system_prompt = (
        "You are the Centralized Decision Core of an emergency response platform named SATYA.\n"
        "Analyze the following text and output a strict JSON object inside your final output.\n"
        "Your final response MUST be a valid JSON object matching this schema:\n"
        "{\n"
        "  \"distress_score\": <integer 0-100>,\n"
        "  \"severity_score\": <integer 0-100>,\n"
        "  \"primary_emergency_type\": \"<POLICE | FIRE | AMBULANCE | LEGAL_AID | COUNSELING>\",\n"
        "  \"justification\": \"<brief reason>\"\n"
        "}"
    )

    try:
        # Call your local DeepSeek model tag via Ollama
        response = ollama.chat(
            model='deepseek-r1:1.5b',  # Optimized 1.5B model footprint for your laptop RAM
            messages=[
                {'role': 'system', 'content': system_prompt},
                {'role': 'user', 'content': f"Distress signal text input: {transcribed_text}"}
            ]
        )
        
        raw_content = response['message']['content']
        
        # 🧠 STRIP DEEPSEEK REASONING TAGS: Removes the <think> text block cleanly
        clean_content = re.sub(r'<think>.*?</think>', '', raw_content, flags=re.DOTALL).strip()
        
        # Extract the pure JSON block if the model added markdown symbols
        if "```json" in clean_content:
            clean_content = clean_content.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_content:
            clean_content = clean_content.split("```")[1].split("```")[0].strip()

        parsed_json = json.loads(clean_content)
        return parsed_json
        
    except Exception as e:
        # High-security system fallback boundaries if layout rules error out
        return {
            "distress_score": 75,
            "severity_score": 70,
            "primary_emergency_type": "COUNSELING",
            "justification": f"DeepSeek response format parsing error fallback: {str(e)}"
        }
