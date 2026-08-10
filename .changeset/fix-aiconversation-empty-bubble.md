---
'@aws-amplify/ui-react-ai': patch
---

fix(ai): stop rendering an empty assistant bubble before the streamed response

`handleSendMessage` optimistically appends an assistant placeholder with the synthetic id `temp-id-2`. In 1.5.1 the stream handler began matching the streamed message by its real id, which never equals `temp-id-2`, so the first stream event appended a second assistant message instead of replacing the placeholder — leaving an empty bubble beside the real reply. When no message matches the streamed id, the handler now replaces the optimistic placeholder in place, while preserving the by-id matching that handles out-of-order and duplicate stream events.
