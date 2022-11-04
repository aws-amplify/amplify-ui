import { Logger } from 'aws-amplify';

type LoggerCategory = 'Auth' | 'Storage' | 'Geo';

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
