---
"@aws-amplify/ui-react-ai": minor
---

feat(ai-conversation): add allowAttachments prop

BREAKING - This is a breaking change to an experimental API. Previously, the AIConversation component always allowed attachments. Now you will need to provide the `allowAttachments` prop to get the same behavior. The reason for this change is that attachments can quickly cost a lot based on the token use and we didn't want the default behavior to have that. 

```jsx
<AIConversation
  allowAttachments
  messages={messages}
  handleSendMessage={handleSendMessage}
/>
```
