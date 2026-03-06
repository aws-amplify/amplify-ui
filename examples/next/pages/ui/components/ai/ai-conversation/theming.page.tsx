import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { ThemeStyle } from '@aws-amplify/ui-react/server';
import { generateClient } from 'aws-amplify/api';
import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import {
  Button,
  ColorMode,
  createTheme,
  defaultDarkModeOverride,
  View,
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
          gap: '{space.small}',
        },
      },
    },
  },
  overrides: [defaultDarkModeOverride],
});

function AIConversationThemePage() {
  const [colorMode, setColorMode] = React.useState<ColorMode>('light');
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <>
      <Button
        onClick={() => {
          setColorMode((prevColorMode) =>
            prevColorMode === 'dark' ? 'light' : 'dark'
          );
        }}
      >
        {colorMode}
      </Button>
      <View
        backgroundColor="background.primary"
        {...theme.containerProps({ colorMode })}
      >
        <AIConversation
          messages={messages}
          handleSendMessage={sendMessage}
          isLoading={isLoading}
          allowAttachments
        />
        <AIConversation
          messages={messages}
          handleSendMessage={sendMessage}
          isLoading={isLoading}
          variant="bubble"
        />
      </View>
      <ThemeStyle theme={theme} />
    </>
  );
}

export default withAuthenticator(AIConversationThemePage);
