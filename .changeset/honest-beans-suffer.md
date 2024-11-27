---
"@aws-amplify/ui-react-ai": minor
"@aws-amplify/ui": patch
---

feat(ai) add attachment validations

The current limitations on the Amplify AI kit for attachments is 400kb (of base64'd size) per image, and 20 images per message are now being enforced before the message is sent.
These limits can be adjusted via props as well.

```tsx
<AIConversation
  maxAttachments={2}
  maxAttachmentSize={100_000} // 100,000 bytes or 100kb
/>
```
