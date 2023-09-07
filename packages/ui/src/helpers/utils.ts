import { Logger } from '@aws-amplify/core';

type LoggerCategory = 'Auth' | 'Geo' | 'Notifications' | 'Storage';

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
