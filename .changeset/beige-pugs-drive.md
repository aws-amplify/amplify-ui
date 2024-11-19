---
"@aws-amplify/ui-react-ai": minor
---

feat(ai): add aiContext prop to AIConversation

```tsx
<AIConversation
  messages={messages}
  isLoading={isLoading}
  handleSendMessage={sendMessage}
  // This will let the LLM know about the current state of this application
  // so it can better respond to questions, you can put any information
  // in this object that might be helpful
  aiContext={() => {
    return {
      currentTime: new Date().toLocaleTimeString(),
    };
  }}
/>
```
