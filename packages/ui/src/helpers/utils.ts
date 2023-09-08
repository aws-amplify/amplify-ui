import { Logger } from 'aws-amplify';

type LoggerCategory = 'Auth' | 'Geo' | 'Notifications' | 'Storage';

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
