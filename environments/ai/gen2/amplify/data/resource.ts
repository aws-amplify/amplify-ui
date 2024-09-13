import { a, ClientSchema, defineData } from '@aws-amplify/backend';

/**
 * STOP! README: This file needs to be defined here for use with the example apps
 *  so that the Schema type can be used for the setting the client type. The actual definition
 *  for the backend is in the staging repo. Any updates made here should also be made in the staging repo.
 */
const schema = a.schema({
  pirateChat: a.conversation({
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt:
      'You are a helpful chatbot that responds in the voice and tone of a pirate. Respond in 20 words or less.',
    inferenceConfiguration: {
      maxTokens: 1000,
      temperature: 1,
      topP: 0.5,
    },
  }),
  generateRecipe: a
    .generation({
      aiModel: a.ai.model('Claude 3 Haiku'),
      systemPrompt: 'You are a helpful assistant that generates recipes.',
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
