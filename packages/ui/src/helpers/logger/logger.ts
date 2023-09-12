import { ConsoleLogger } from '@aws-amplify/core/internals/utils';

type LoggerCategory =
  | 'AccountSettings'
  | 'Auth'
  | 'Geo'
  | 'Icon'
  | 'Notifications'
  | 'StateMachine'
  | 'StorageImage'
  | 'StorageManager';

export const getLogger = (category: LoggerCategory) =>
  new ConsoleLogger(`AmplifyUI:${category}`);
