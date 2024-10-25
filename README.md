NOTES ON THE PROJECT 
- MEGAVERSE API DOCS
- the megaverse api is a REST API, all API routes below refer to a singel route:https://challenge.crossmint.io/api/
- IMPORTANT: ALL API ROUUTES TAKE A REQUIRED PARAMETER CANDIDATEID

# POLYANETS-PHASE 1

 - POST /api/polyanets with arguments: candidateId, row, column
    - this route is used to create a polyanet at a given row and column
    - the polyanet will have a "white" color by default
- DELETE /api/polyantes/

