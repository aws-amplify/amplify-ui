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
      avatars={{
        user: {
          avatar: <Avatar src="/cats/1.jpg" />,
          username: 'djb',
        },
        ai: {
          avatar: <Avatar src="/cats/2.jpg" />,
          username: 'bot',
        },
      }}
    />
  );
}
