---
"@aws-amplify/ui-react-liveness": patch
---

fix: removes 500 status code sent upon websocket connection timeout.

A websocket connection timeout will now return the error "Websocket connection timeout"
