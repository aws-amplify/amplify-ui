import { Avatar } from '@aws-amplify/ui-react';
import { AIConversation } from '@aws-amplify/ui-react-ai';
export default function AvatarExample() {
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
      controls={{
        MessageList: ({ messages }) => {
          return (
            <div>
              {messages.map((message) => (
                <div key={message.id}>
                  {message.content.map((content) => (
                    <div key={content.text}>{content.text}</div>
                  ))}
                </div>
              ))}
            </div>
          );
        },
        Form: () => {
          return <div />;
        },
      }}
    />
  );
}
