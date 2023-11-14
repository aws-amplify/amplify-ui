import { ConsoleLogger as Logger } from 'aws-amplify/utils';

type LoggerCategory =
  | 'Auth'
  | 'AccountSettings'
  | 'Geo'
  | 'Notifications'
  | 'Storage';

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
