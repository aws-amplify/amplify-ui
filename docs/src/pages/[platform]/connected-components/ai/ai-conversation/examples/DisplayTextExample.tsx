import { AIConversation } from '@aws-amplify/ui-react-ai';

export default function DisplayTextExample() {
  return (
    <AIConversation
      messages={[
        {
          role: 'user',
          content: [{ text: 'hello' }],
          createdAt: new Date().toDateString(),
          id: '1',
          conversationId: '1',
        },
        {
          role: 'assistant',
          content: [{ text: 'hello back' }],
          createdAt: new Date().toDateString(),
          id: '1',
          conversationId: '1',
        },
      ]}
      handleSendMessage={() => {}}
      displayText={{
        getMessageTimestampText: (date) =>
          date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
      }}
    />
  );
}
