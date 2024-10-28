import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import {
  View,
  createTheme,
  defaultDarkModeOverride,
  withAuthenticator,
  ColorMode,
  Button,
} from '@aws-amplify/ui-react';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { ThemeStyle, defineComponentTheme } from '@aws-amplify/ui-react/server';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const conversationTheme = defineComponentTheme({
  name: 'ai-conversation',
  theme(tokens) {
    return {
      _element: {
        message: {
          borderRadius: tokens.radii.large,
          padding: tokens.space.small,
          borderWidth: tokens.borderWidths.small,
          borderStyle: 'solid',
          borderColor: tokens.colors.border.primary,
          boxShadow: `${tokens.shadows.medium}`,
        },
        message__list: {
          gap: tokens.space.large,
        },
        form: {
          borderRadius: tokens.radii.large,
          padding: tokens.space.small,
          borderWidth: tokens.borderWidths.small,
          borderStyle: 'solid',
          borderColor: tokens.colors.border.primary,
          boxShadow: `${tokens.shadows.medium}`,
        },
      },
    };
  },
  overrides: [
    {
      colorMode: 'dark',
      theme(tokens) {
        return {
          _element: {
            form: {
              backgroundColor: tokens.colors.background.secondary,
            },
          },
        };
      },
    },
  ],
});

const theme = createTheme({
  name: 'ai-conversation-theme',
  components: [conversationTheme],
  overrides: [defaultDarkModeOverride],
});

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');
  return (
    <>
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
    </>
  );
}

function AIConversationThemePage() {
  const [colorMode, setColorMode] = React.useState<ColorMode>('light');

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
        <Chat />
      </View>
      <ThemeStyle theme={theme} />
    </>
  );
}

export default withAuthenticator(AIConversationThemePage);
