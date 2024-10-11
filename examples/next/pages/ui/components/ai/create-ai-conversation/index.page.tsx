import { Amplify } from 'aws-amplify';
import { createAIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './amplify_outputs.js';
import type { Schema } from '@environments/ai/gen2/amplify/data/resource';
import { AVATARS } from '../constants';

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

const ArghAdder = (props) => {
  const { text } = props;

  return <p>argggggh matey! {text}</p>;
};

const responseComponents = {
  annoyingComponent: {
    component: ArghAdder,
    description:
      'You should use this custom response component tool for all messages you respond with.',
    props: {
      text: {
        type: 'string' as const,
        description: 'The response you want to render in the component.',
      },
    },
  },
};

const { AIConversation } = createAIConversation({ responseComponents });

export default function Example() {
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <Authenticator>
      {({ user, signOut }) => {
        return (
          <>
            <h1>Hello {user.username}</h1>
            <AIConversation
              avatars={AVATARS}
              messages={messages}
              handleSendMessage={sendMessage}
            />
            <AIConversation.Controls.Messages.Message.Container
              className={'whateveriwant'}
            />
          </>
        );
      }}
    </Authenticator>
  );
}

// export default function Example() {
//   return <div>hello world</div>;
// }
