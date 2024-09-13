from firebase_functions import https_fn
from firebase_admin import auth, initialize_app
import json
import logging

# Initialize Firebase admin if not already initialized
initialize_app()

logging.basicConfig(level=logging.INFO)

@https_fn.on_request()
def generate_sequence(req: https_fn.Request) -> https_fn.Response:
    # Log the incoming request data
    logging.info("Request received with query params: %s", req.args)
    
    # Get the Authorization header from the request
    auth_header = req.headers.get('Authorization')
    
    if not auth_header:
        return https_fn.Response(json.dumps({"error": "Authorization header missing"}), status=401)

    try:
        # Verify the ID token from the Authorization header
        id_token = auth_header.split(" ")[1]
        decoded_token = auth.verify_id_token(id_token)
        user_email = decoded_token['email']
        request_data = req.get_json()
        user_doc = request_data.get('userDoc', {})
        practice_request = request_data.get('practiceRequest', {})

        # Check if the user's email is maman@gmail.com
        if user_email == 'maman@sky.com':
            sequence = [
                "W059", "FSp001", "TransitionSptoSd004", "TransitionSdtoAf002", "W028", "W029", "TransitionAftoAf027", "TransitionAftoSg002",
                  "W064", "W058", "TransitionSgtoAf006", "LSg028", "TransitionAftoSg001", "LSg018", "LSg010", "TransitionSgtoSd004", "TSd009", 
                  "CSd008", "TSp001", "In023", "W052"]
        elif user_email == 'nader@sky.com':
            sequence = [
                "W042", "W003", "TransitionAftoSd017", "ShAf004", "TransionAftoAf012", "Svan", "TransitionAftoAf021", "TransitionAftoPr005", 
                "BPr002", "TransitionPrtoPr001", "BPr022", "TransitionPrtoAf002", "TransitionAftoAf023", "ShAf003", "TransitionAftoAf020", "Svan", 
                "TransitionAftoSg002", "W036", "W058", "W036", "TransitionSgtoAf002", "TransitionAftoPr006", "BPr006", "TransitionPrtoAf002", 
                "TransitionAftoSg002", "W040", "TransitionSgtoSd004", "CSd009", "TRansitionAftoPr004", "BPr038", "TransitionPrtoAf002", "TSd006",
                  "TransitionAftoAf015", "TransitionAftoSp002", "In009", "TSp001", "W052"]
        elif user_email == 'nahid@sky.com':
            sequence = [
                "W059", "FSp001", "CSp001", "TransitionSptoSd004", "W025", "TransitionSdtoAf002", "W049", "W064", "W062", "FSg003", 
                "TransitionSgtoSd003", "FSd001", "BSd001", "CSd008", "BSp008", "TSp003", "In022", "TransitionSdtoSp001", "W052"]
        else:
            sequence = ['BPr002', 'TransitionPrtoPr005', 'BPr032']

        return https_fn.Response(json.dumps({"sequence": sequence}), headers={"Content-Type": "application/json"})

    except Exception as e:
        logging.error(f"Error verifying token or fetching user profile: {e}")
        return https_fn.Response(json.dumps({"error": str(e)}), status=401)
