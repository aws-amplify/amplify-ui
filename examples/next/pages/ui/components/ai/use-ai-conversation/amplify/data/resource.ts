import { a, ClientSchema, defineData } from '@aws-amplify/backend';

// TODO: Update schema once backend-ai has been released
const schema = a.schema({
  pirateChat: a.conversation({
    // better dx for aiModel in progress
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt:
      'You are a helpful chatbot that responds in the voice and tone of a pirate. Respond in 20 words or less.',
    // these aren't used yet
    inferenceConfiguration: {
      maxTokens: 1000,
      temperature: 1,
      topP: 0.5,
    },
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
