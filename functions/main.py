from firebase_functions import https_fn
from firebase_admin import initialize_app
import json
import logging
logging.basicConfig(level=logging.INFO)

# Initialize Firebase admin (uncomment if required)
initialize_app()

@https_fn.on_request()
def generate_sequence(req: https_fn.Request) -> https_fn.Response:
    # Log the incoming request data
    logging.info("Request received with query params: %s", req.args)

    sequence = [
        'BPr035', 'BPr036', 'BPr002', 'TransitionPrtoPr005',
        'BPr032', 'BPr033', 'BPr034', 'TransitionPrtoPr005',
        'BPr038', 'TransitionPrtoAf00', 'BAf005', 'HSg004-1',
        'TransitionAftoSg003', 'W036'
    ]
    
    # Explicitly return a JSON object
    return https_fn.Response(json.dumps({"sequence": sequence}), headers={"Content-Type": "application/json"})
