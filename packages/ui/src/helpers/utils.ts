import { Logger } from 'aws-amplify';

type LoggerCategory = 'Auth' | 'Storage' | 'Geo';

export const getCategoryLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
