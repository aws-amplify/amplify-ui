import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { ThemeStyle } from '@aws-amplify/ui-react/server';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import {
  Authenticator,
  Card,
  createTheme,
  withAuthenticator,
} from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const theme = createTheme({
  name: 'ai-conversation-theme',
  tokens: {
    components: {
      aiConversation: {
        message: {
          backgroundColor: { value: '#f5f5f5' },
          // color: { value: '#000000' },
        },
      },
    },
  },
});

function AIConversationThemePage() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');
  return (
    <Card>
      <div {...theme.containerProps()}>
        <AIConversation
          messages={messages}
          handleSendMessage={sendMessage}
          isLoading={isLoading}
        />
        <AIConversation
          messages={messages}
          handleSendMessage={sendMessage}
          isLoading={isLoading}
          variant="bubble"
        />
        <ThemeStyle theme={theme} />
      </div>
    </Card>
  );
}

export default withAuthenticator(AIConversationThemePage);
