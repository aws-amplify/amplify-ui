---
"@aws-amplify/ui-react-ai": minor
"@aws-amplify/ui": patch
---

chore: ai cleanup

```jsx
<AIConversation
  messages={messages}
  handleSendMessage={handleSendMessage}
  actions={[
    {
      component: <MdCopyAll />,
      handler: (message) => {},
    }
  ]}
/>
```
