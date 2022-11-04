import { Logger } from 'aws-amplify';

type LoggerCategory = 'Auth' | 'Geo' | 'Notifications' | 'Storage';

export const getCategoryLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
