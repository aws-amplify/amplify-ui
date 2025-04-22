import { ConsoleLogger } from 'aws-amplify/utils';

type LoggerCategory =
  | 'Auth'
  | 'AccountSettings'
  | 'Geo'
  | 'Notifications'
  | 'Storage';

export const getLogger = (category: LoggerCategory): ConsoleLogger =>
  new ConsoleLogger(`AmplifyUI:${category}`);
