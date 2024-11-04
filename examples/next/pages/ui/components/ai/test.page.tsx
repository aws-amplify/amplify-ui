import * as React from 'react';
import { Amplify } from 'aws-amplify';
import {
  createAIHooks,
  AIConversation,
  createAIConversation,
} from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './ai-conversation-response-components/amplify_outputs';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import {
  Authenticator,
  Card,
  Loader,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import {
  Conversation,
  ConversationMessage,
  ToolConfiguration,
} from '@aws-amplify/ui-react-ai/dist/types/types';
import { signOut } from 'aws-amplify/auth';

const client = generateClient<Schema>({ authMode: 'userPool' });

Amplify.configure(outputs);

const toolConfiguration: ToolConfiguration = {
  tools: {
    AMPLIFY_UI_WeatherCard: {
      inputSchema: {
        json: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The location of the weather to display',
            },
          },
        },
      },
      description: 'Used to display the weather',
    },
  },
} as const;

function WeatherCard({ location }: { location: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      console.log('loaded weather card');
      setIsLoaded(true);
    }, 3000);
  }, [location]);
  return isLoaded ? <div>weather card {location}</div> : <Loader />;
}

const CustomComponent = React.memo(function CustomComponent({
  Component,
  props,
  toolUseId,
  handleSendMessage,
}: {
  Component: React.ComponentType<any>;
  props: any;
  toolUseId: string;
  handleSendMessage: any;
}) {
  // React.useEffect(() => {
  //   console.log('sending message');
  //   if (toolUseId) {
  //     handleSendMessage?.({
  //       content: [
  //         {
  //           toolResult: {
  //             toolUseId,
  //             content: [
  //               {
  //                 text: 'Displayed component to user',
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //       toolConfiguration,
  //     });
  //   }
  // }, [toolUseId, handleSendMessage]);

  return <Component {...props} />;
});

const Message = ({
  message,
  handleSendMessage,
}: {
  message: ConversationMessage;
  handleSendMessage: any;
}) => {
  return message.content.map((content, index) => {
    if (content.text) return <div key={index}>{content.text}</div>;
    if (content.toolUse) {
      return (
        <CustomComponent
          key={index}
          props={content.toolUse.input}
          toolUseId={content.toolUse.toolUseId}
          handleSendMessage={handleSendMessage}
          Component={WeatherCard}
        />
      );
    }
  });
};

function TestPage() {
  const [conversation, setConversation] = React.useState<Conversation>();
  const [messages, setMessages] = React.useState<ConversationMessage[]>([]);
  React.useEffect(() => {
    client.conversations.chat.create().then(({ data }) => {
      setConversation(data);
      data.onMessage((message) => {
        console.log(message);
        setMessages((prev) => [...prev, message]);
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const message = formData.get('message') as string;
    conversation?.sendMessage({
      content: [{ text: message }],
      toolConfiguration,
    });
  };

  return <></>;
}

export default withAuthenticator(TestPage);
