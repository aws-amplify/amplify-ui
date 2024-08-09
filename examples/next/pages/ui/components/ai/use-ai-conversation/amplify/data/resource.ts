import { a, ClientSchema, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Foo: a
    .model({ bar: a.integer() })
    .authorization((allow: { authenticated: () => any }) =>
      allow.authenticated()
    ),

  pirateChat: a.conversation({
    // better dx for aiModel in progress
    aiModel: {
      friendlyName: 'Claude3Haiku',
      resourcePath: 'anthropic.claude-3-haiku-20240307-v1:0',
    },
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
