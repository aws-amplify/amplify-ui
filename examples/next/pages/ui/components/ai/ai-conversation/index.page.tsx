import { createAIConversation } from '@aws-amplify/ui-react-ai';

const { AIConversation } = createAIConversation();

export default function Example() {
  return <AIConversation />;
}
