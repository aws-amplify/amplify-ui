import { AIConversation } from '@aws-amplify/ui-react-ai';
import '@aws-amplify/ui-react/styles.css';

import { Card, Text } from '@aws-amplify/ui-react';
import Image from 'next/image';
import { INITIAL_MESSAGES } from '../constants';
import { convertBufferToBase64 } from '../utils';

export default function Example() {
  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
        // @ts-expect-error
        messages={INITIAL_MESSAGES}
        handleSendMessage={() => {}}
        allowAttachments
        messageRenderer={{
          text: ({ text }) => <Text className="testing">{text}</Text>,
          image: ({ image }) => (
            <Image
              className="testing"
              width={200}
              height={200}
              src={convertBufferToBase64(image.source.bytes, image.format)}
              alt=""
            />
          ),
        }}
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
