import { ConsoleLogger as Logger } from '@aws-amplify/core';

type LoggerCategory =
  | 'Auth'
  | 'AccountSettings'
  | 'Geo'
  | 'Notifications'
  | 'Storage';

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
