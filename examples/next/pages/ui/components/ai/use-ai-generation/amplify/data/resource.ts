import { a, ClientSchema, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  generateRecipe: a
    .generation()
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
  generateWhatever: a
    .generation()
    .arguments({
      description2222: a.string(),
    })
    .returns(
      a.customType({
        name111: a.string(),
        ingredients222: a.string().array(),
        instructions333: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;
type foo = Schema['generateRecipe'];

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
