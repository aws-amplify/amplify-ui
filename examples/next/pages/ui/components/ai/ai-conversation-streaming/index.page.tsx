import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import ReactMarkdown from 'react-markdown';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';
import { GlobalStyle } from '@aws-amplify/ui-react/server';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import {
  Authenticator,
  Button,
  Card,
  Flex,
  TextField,
} from '@aws-amplify/ui-react';
import {
  Conversation,
  ConversationMessage,
} from '@aws-amplify/ui-react-ai/dist/types/types';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversationStreaming } = createAIHooks(client);

Amplify.configure(outputs);

// (async () => {
//   const { data, errors } = await client.conversations.chat.create();
//   data.onMessage((message) => console.log(message));
//   await data.sendMessage({ content: [{ text: 'hello' }] });
//   console.log({ data, errors });
// })();

// const formatDate = (date: Date): string =>
//   `Argh the time be round ${date.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   })}`;

// function Chat() {
//   const [conversation, setConversation] = React.useState<Conversation>();
//   const [messages, setMessages] = React.useState<ConversationMessage[]>([]);
//   const chunksRef = React.useRef<ConversationMessage[]>();
//   React.useEffect(() => {
//     // client.conversations.chat
//     //   .get({ id: '52be04bc-6a49-4812-b12a-d407987d4c0b' })
//     //   .then(({ data }) => {
//     //     data.listMessages().then((res) => {
//     //       console.log(res);
//     //     });
//     //   });
//     client.conversations.chat.create().then(({ data, errors }) => {
//       console.log({ data, errors });
//       setConversation(data);
//       data.onMessage((message) => {
//         console.log(message);
//         const isChunk = message.id.endsWith('#response');
//         if (isChunk) {
//           // if it is the last chunk
//           if (!message.content[0]) {
//             console.log('Last chunk');
//             chunksRef.current = undefined;
//           }
//           // if there is no current ref its the first chunk
//           else if (!chunksRef.current) {
//             chunksRef.current = [message];
//             setMessages((previousLocalMessages) => [
//               ...previousLocalMessages,
//               { ...message },
//             ]);
//           } else {
//             chunksRef.current.push(message);
//             chunksRef.current.sort((a, b) =>
//               new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
//             );
//             // merge all message content blocks
//             // some might have text, some might have tool results
//             const content = chunksRef.current.reduce((prev, curr) => {
//               if (curr.content && curr.content.length) {
//                 const textBlock = curr.content.find((c) => c.text);
//                 if (textBlock) {
//                   return prev + textBlock.text;
//                 }
//               }
//               return prev;
//             }, '');
//             console.log({ content });
//             const fullMessage = {
//               ...message,
//               content: [{ text: content }],
//             };
//             setMessages((previousLocalMessages) => [
//               ...previousLocalMessages.slice(0, -1),
//               fullMessage,
//             ]);
//           }
//         }
//       });
//     });
//     return () => {
//       setConversation(undefined);
//     };
//   }, []);

//   const handleSubmit = React.useCallback(
//     (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const form = e.currentTarget;
//       const formData = new FormData(form);
//       const message = formData.get('message') as string;
//       conversation?.sendMessage({
//         content: [{ text: message }],
//       });
//     },
//     [conversation]
//   );

//   return (
//     <Flex as="form" onSubmit={handleSubmit} direction="column">
//       <TextField label="message" name="message" />
//       <Button type="submit">Send</Button>
//       {messages.map((message) => (
//         <Card key={message.id}>{message.content[0].text}</Card>
//       ))}
//     </Flex>
//   );
// }

const responseComponents = {
  WeatherCard: {
    description: 'Used to display the weather in a city',
    component: ({ city }) => {
      return (
        <Card variation="outlined">
          <h3>Weather Card {city}</h3>
        </Card>
      );
    },
    props: {
      city: {
        type: 'string',
        description: 'The city to get the weather for',
      },
    },
  },
} as const;

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
      hasError,
    },
    sendMessage,
  ] = useAIConversationStreaming('chat', {
    responseComponents,
    // id: '14461c14-aea0-4e9f-af69-96bfe0bc3d00',
  });
  return (
    <AIConversation
      messages={messages}
      isLoading={isLoading}
      handleSendMessage={sendMessage}
      messageRenderer={{
        text: (message) => <ReactMarkdown>{message}</ReactMarkdown>,
      }}
      responseComponents={responseComponents}
    />
  );
}

export default function Example() {
  return (
    <Authenticator>
      <Card variation="outlined" height="400px" margin="large">
        <Chat />
      </Card>
      <GlobalStyle
        styles={{
          code: {
            backgroundColor: 'var(--amplify-colors-background-tertiary)',
          },
          pre: {
            backgroundColor: 'var(--amplify-colors-background-tertiary)',
            display: 'block',
            padding: '1rem',
          },
        }}
      />
    </Authenticator>
  );
}
