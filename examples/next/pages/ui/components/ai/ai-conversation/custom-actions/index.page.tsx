import { MdCopyAll } from 'react-icons/md';
import { AIConversation } from '@aws-amplify/ui-react-ai';
import '@aws-amplify/ui-react/styles.css';

import { Authenticator, Card } from '@aws-amplify/ui-react';
import { INITIAL_MESSAGES } from '../../constants';

function Chat() {
  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
        messages={INITIAL_MESSAGES}
        handleSendMessage={() => {}}
        actions={[
          {
            component: <MdCopyAll />,
            handler: (message) => console.log(message),
          },
          {
            component: <MdCopyAll />,
            handler: (message) => console.log(message),
          },
        ]}
        allowAttachments
        suggestedPrompts={[
          {
            inputText: 'hello',
            component: 'hello',
          },
          {
            inputText: 'how are you?',
            component: 'how are you?',
          },
        ]}
        variant="bubble"
      />
    </Card>
  );
}

export default function Example() {
  return (
    <Authenticator>
      <Chat />
    </Authenticator>
  );
}
