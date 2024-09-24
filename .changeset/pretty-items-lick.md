---
"@aws-amplify/ui": patch
---

chore(ai): add theming for AIConversation

```ts
const theme = createTheme({
  tokens: {
    components: {
      aiConversation: {}
    }
  }
})
```

```ts
const aiConversationTheme = defineComponentTheme({
  name: 'ai-conversation',
  theme(tokens) {
    return {
      _element: {
        message: {
          color: tokens.colors.font.tertiary
        }
      }
    }
  }
});
```
