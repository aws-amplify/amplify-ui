// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { UserPreference, User } = initSchema(schema);

export { UserPreference, User };
