import { isDeleteViewDisplayTextKey } from '../../../displayText';
import { createActionResolvers } from './createActionResolvers';

export const DELETE_TABLE_RESOLVERS = createActionResolvers(
  isDeleteViewDisplayTextKey
);
