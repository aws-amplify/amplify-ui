import { isCopyViewDisplayTextKey } from '../../../displayText';
import { createActionResolvers } from './createActionResolvers';

export const COPY_TABLE_RESOLVERS = createActionResolvers(
  'copy',
  isCopyViewDisplayTextKey
);
