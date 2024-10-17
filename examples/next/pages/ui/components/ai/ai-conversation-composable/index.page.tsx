import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card, Flex } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

// function Chat() {
//   const [
//     {
//       data: { messages },
//       isLoading,
//     },
//     sendMessage,
//   ] = useAIConversation('pirateChat');

//   return (
//     <Card variation="outlined" width="50%" height="300px" margin="0 auto">
//       <AIConversation.Provider
//         messages={messages}
//         handleSendMessage={sendMessage}
//         isLoading={isLoading}
//         allowAttachments
//         suggestedPrompts={[
//           {
//             inputText: 'hello',
//             header: 'hello',
//           },
//           {
//             inputText: 'how are you?',
//             header: 'how are you?',
//           },
//         ]}
//         variant="bubble"
//       >
//         <AIConversation.Messages />
//         <AIConversation.Form />
//       </AIConversation.Provider>
//     </Card>
//   );
// }

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('chat', { id: '29d29c3c-9216-4b77-b44b-b5ec69c9f235' });

  React.useEffect(() => {
    client.conversations.chat.list().then((res) => {
      res.data.forEach((convo) => {
        convo.listMessages().then((res) => {
          console.log(res.data);
        });
      });
    });
  }, []);

  return (
    <AIConversation.Provider
      messages={messages}
      handleSendMessage={sendMessage}
      avatars={{
        user: {
          username: 'XXXX',
        },
      }}
    >
      <Flex direction="row">
        <Card variation="outlined" width="50%" flex="1">
          <AIConversation.MessagesControl />
        </Card>
        <Card variation="outlined" width="50%" flex="1">
          <AIConversation.FieldControl />
        </Card>
      </Flex>
    </AIConversation.Provider>
  );
}

export default function Example() {
  return (
    <Authenticator>
      {({ user, signOut }) => {
        return <Chat />;
      }}
    </Authenticator>
  );
}
