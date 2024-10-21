---
"@aws-amplify/ui-react-ai": minor
---


The AIConversation component is now composable if you are using the default component or the headless component using `createAIConversation()`. There are 4 parts:

* Provider: provides all the necessary data/handlers for the composable components
* Messages: the message history for the conversation
* DefaultMessage: contains an optional welcome message and prompt suggestions, only shown if no messages present
* Form: the form for sending messages, includes the text input, submit button, and attachments

```jsx
function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <AIConversation.Provider
      messages={messages}
      handleSendMessage={sendMessage}
      isLoading={isLoading}
    >
      <Flex direction="row">
        <Card variation="outlined" width="50%" flex="1">
          <AIConversation.DefaultMessage />
          <AIConversation.Messages />
        </Card>
        <Card variation="outlined" width="50%" flex="1">
          <AIConversation.Form />
        </Card>
      </Flex>
    </AIConversation.Provider>
  );
}
```
