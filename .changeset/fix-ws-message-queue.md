---
"@aws-amplify/ui-react-liveness": patch
---

fix(react-liveness): buffer WebSocket messages to prevent dropped server events

The `CustomWebSocketFetchHandler` async iterator used a single `resolve`
function that was initialized as a no-op. If the server sent messages before
the consumer called `.next()` on the iterator, those messages were silently
dropped. This caused intermittent hangs where the `ServerSessionInformationEvent`
was lost and the state machine polled `waitForSessionInfo` forever.

This change replaces the single resolve/reject pattern with a proper message
queue that buffers incoming WebSocket messages until the consumer is ready to
receive them.
