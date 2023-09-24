import { ConsoleLogger as Logger } from '@aws-amplify/core/internals/utils';

type LoggerCategory = 'Auth' | 'Geo' | 'Notifications' | 'Storage';

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
