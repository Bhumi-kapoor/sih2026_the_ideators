def route_emergency_case(triage_data: dict):
    """
    LAYER 4: Smart Action Routing Logic.
    Returns dynamic emergency fleet dispatch parameters for live conditions,
    and returns rich interactive professional directories for historical trauma.
    """
    distress_score = triage_data.get("distress_score", 50)
    severity_score = triage_data.get("severity_score", 50)
    timeline = triage_data.get("incident_timeline", "ACTIVE")
    emergency_type = triage_data.get("primary_emergency_type", "POLICE")

    routing_action = {
        "case_severity": "LOW",
        "incident_classification": "HISTORICAL_RECORD",
        "action_sector": "STANDARD_QUEUE",
        "assigned_dispatch_unit": "UNASSIGNED",
        "requires_immediate_siren_alert": False,
        "dispatch_telemetry": {}
    }

    if distress_score >= 80 or severity_score >= 80:
        routing_action["case_severity"] = "CRITICAL"
    elif distress_score >= 50:
        routing_action["case_severity"] = "MEDIUM"
    else:
        routing_action["case_severity"] = "LOW"

    # --- SATYA DUAL-MODE ROUTING MATRIX WITH USER SELECTION ARRAYS ---
    if timeline == "ACTIVE" and routing_action["case_severity"] == "CRITICAL" and emergency_type in ["POLICE", "AMBULANCE", "FIRE"]:
        # 🚨 MODE 1: LIVE crisis requires instant automated fleet dispatch
        routing_action["incident_classification"] = "LIVE_ACTIVE_CRISIS"
        routing_action["action_sector"] = "EMERGENCY_FLEET_DISPATCH"
        routing_action["requires_immediate_siren_alert"] = True
        routing_action["assigned_dispatch_unit"] = f"CRITICAL_{emergency_type}_UNIT"
        routing_action["dispatch_telemetry"] = {
            "dispatch_status": "PCR_VAN_DISPATCHED",
            "estimated_response_time": "1.4 Minutes",
            "safety_aura_protocol": "ENABLED",
            "gps_coordinates": "LIVE_MOBILE_SIGNAL_LATCHED"
        }

    elif timeline == "HISTORICAL" and emergency_type == "SC_ST_ATROCITY":
        # 🛡️ MODE 2: HISTORICAL SC/ST DISCRIMINATION REPORT (Interactive Selectable Directory)
        routing_action["incident_classification"] = "HISTORICAL_ATROCITY_GRIEVANCE"
        routing_action["action_sector"] = "NATIONAL_SC_ST_PROTECTION_CELL"
        routing_action["assigned_dispatch_unit"] = "NHMA_ATROCITY_RESPONSE_TEAM"
        routing_action["dispatch_telemetry"] = {
            "primary_helpline": "14566 - National Helpline for Prevention of Atrocities (NHMA)",
            "legal_aid_framework": "SC/ST (Prevention of Atrocities) Act Compliance",
            "next_step": "Automatic escalation logged to District Magistrate",
            "user_action_required": "Victim must select their preferred support professional below:",
            "selectable_counselor_directory": [
                {"counselor_id": "COUNSELOR_SCST_01", "name": "Dr. Meenakshi Kaur", "specialization": "SC/ST Trauma Specialist", "status": "AVAILABLE"},
                {"counselor_id": "COUNSELOR_SCST_02", "name": "Advocate Ramesh Paswan", "specialization": "Caste-Based Legal & Crisis Counsel", "status": "AVAILABLE"}
            ]
        }

    else:
        # 🧠 MODE 3: GENERAL PAST TRAUMA CASE (Interactive Selectable Directory)
        routing_action["incident_classification"] = "HISTORICAL_SUPPORT_CASE"
        routing_action["action_sector"] = "INTEGRATED_SUPPORT_SERVICES"
        routing_action["assigned_dispatch_unit"] = "CERTIFIED_COUNSELOR_AND_LEGAL_DESK"
        routing_action["dispatch_telemetry"] = {
            "primary_helpline": "1091 - Women Distress Helpline Connection Link",
            "secondary_support": "DLSA Pro-Bono Legal Aid available via console toggle",
            "user_action_required": "Victim must select their preferred support professional below:",
            "selectable_counselor_directory": [
                {"counselor_id": "COUNSELOR_GEN_01", "name": "Dr. Meenakshi Kaur", "specialization": "Trauma & Crisis Counseling", "status": "AVAILABLE"},
                {"counselor_id": "COUNSELOR_GEN_02", "name": "Prof. R. S. Sharma", "specialization": "Past Trauma Rehabilitation", "status": "AVAILABLE"}
            ]
        }

    return routing_action
