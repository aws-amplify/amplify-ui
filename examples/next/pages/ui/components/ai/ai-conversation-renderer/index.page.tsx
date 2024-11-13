import { Amplify } from 'aws-amplify';
import { AIConversation } from '@aws-amplify/ui-react-ai';
import '@aws-amplify/ui-react/styles.css';

import outputs from './amplify_outputs';
import { Authenticator, Card, Text } from '@aws-amplify/ui-react';
import Image from 'next/image';
import { INITIAL_MESSAGES } from '../constants';

Amplify.configure(outputs);

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function convertBufferToBase64(buffer: ArrayBuffer, format: string): string {
  let base64string = '';
  // Use node-based buffer if available
  // fall back on browser if not
  if (typeof Buffer !== 'undefined') {
    base64string = Buffer.from(new Uint8Array(buffer)).toString('base64');
  } else {
    base64string = arrayBufferToBase64(buffer);
  }
  return `data:image/${format};base64,${base64string}`;
}

function Chat() {
  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
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

export default function Example() {
  return (
    <Authenticator>
      <Chat />
    </Authenticator>
  );
}
