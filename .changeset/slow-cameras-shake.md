---
"@aws-amplify/ui-react-liveness": patch
---

chore(liveness v2): Update dependencies in liveness package (@aws-sdk/client-rekognitionstreaming) to get fast-xml-parser fix.
A websocket connection timeout will now return the error state `CONNECTION_TIMEOUT` with message `Websocket connection timeout`. This also updates the `displayText` to include `connectionTimeoutHeaderText` and `connectionTimeoutMessageText` for displaying the error in the UI.
