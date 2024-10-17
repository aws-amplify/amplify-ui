import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
// import ReactMarkdown from 'react-markdown';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';
import { GlobalStyle } from '@aws-amplify/ui-react/server';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { Authenticator, Card } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversationStreaming } = createAIHooks(client);

Amplify.configure(outputs);

// const responseComponents = {
//   WeatherCard: {
//     description: 'Used to display the weather in a city',
//     component: ({ city }) => {
//       return (
//         <Card variation="outlined">
//           <h3>Weather Card {city}</h3>
//         </Card>
//       );
//     },
//     props: {
//       city: {
//         type: 'string',
//         description: 'The city to get the weather for',
//       },
//     },
//   },
// } as const;

// function Chat() {
//   const [
//     {
//       data: { messages },
//       isLoading,
//     },
//     sendMessage,
//   ] = useAIConversationStreaming('chat', {
//     responseComponents,
//   });
//   return (
//     <AIConversation
//       messages={messages}
//       isLoading={isLoading}
//       handleSendMessage={sendMessage}
//       // messageRenderer={{
//       //   text: (message) => <ReactMarkdown>{message}</ReactMarkdown>,
//       // }}
//       responseComponents={responseComponents}
//     />
//   );
// }

function Chat() {
  return null;
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
