---
"@aws-amplify/ui-react-ai": minor
---

feat(ai): add message renderer

```tsx
<AIConversation
  messages={messages}
  handleSendMessage={sendMessage}
  isLoading={isLoading}
  messageRenderer={{
    text: ({text}) => <ReactMarkdown>{text}</ReactMarkdown>,
  }}
/>
```
