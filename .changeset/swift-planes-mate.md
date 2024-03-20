---
"@aws-amplify/ui-react-liveness": patch
---

chore(liveness): remove one second oval match criteria. "Hold still" text will still appear after face match, but we no longer wait for the user to hold still before flashing colors; this happens immediately after a match. 
