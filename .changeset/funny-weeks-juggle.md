---
"@aws-amplify/ui-react-liveness": patch
---

fix: removes 500 status code sent upon websocket connection timeout and adds CONNECTION_TIMEOUT event.

A websocket connection timeout will now return the error state `CONNECTION_TIMEOUT` with message `Websocket connection timeout`. This also updates the displayText to include connectionTimeoutHeaderText and connectionTimeoutMessageText for displaying the error in the UI.
