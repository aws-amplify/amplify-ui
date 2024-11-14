import { AIConversation, ConversationMessage } from '@aws-amplify/ui-react-ai';
import '@aws-amplify/ui-react/styles.css';

const messages: ConversationMessage[] = [
  {
    role: 'user',
    content: [
      {
        text: 'hello',
      },
    ],
    conversationId: '1',
    id: '2',
    createdAt: new Date(2023, 4, 21, 15, 24).toDateString(),
  },
  {
    role: 'assistant',
    content: [
      {
        toolUse: {
          name: 'AMPLIFY_UI_foobar',
          input: { foo: 'bar' },
          toolUseId: '1234',
        },
      },
    ],
    conversationId: '1',
    id: '2',
    createdAt: new Date(2023, 4, 21, 15, 24).toDateString(),
  },
];

// Note: because response components are sent in the message
// there could be cases where the AIConversation component
// gets rendered with an existing conversation and does not
// have the React component needed to render the response
// component. For example in the Amplify console, we don't
// have customers' React code running in our console.
// Because of this, this example page isn't actually
// using a live conversation route.
export default function Example() {
  return (
    <AIConversation
      messages={messages}
      handleSendMessage={() => {}}
      FallbackResponseComponent={(props) => {
        return <div>{JSON.stringify(props)}</div>;
      }}
    />
  );
}
