import { UnverifiedContactMethodType } from './user';

export const isUnverifiedContactMethodType = (value: string): boolean =>
  Object.values(UnverifiedContactMethodType).findIndex(
    (val) => val === value
  ) >= 0;
