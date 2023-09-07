type LoggerCategory =
  | 'AccountSettings'
  | 'Auth'
  | 'Geo'
  | 'Icon'
  | 'Notifications'
  | 'StateMachine'
  | 'StorageImage'
  | 'StorageManager';

export enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARN = 'WARN',
}

class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private log(level: LOG_LEVEL, message: string, error?: Error): void {
    switch (level) {
      case LOG_LEVEL.INFO:
        console.info(`[${level}] - ${this.name} ${message}`);
        break;
      case LOG_LEVEL.DEBUG:
        console.debug(`[${level}] - ${this.name} ${message}`, error);
        break;
      case LOG_LEVEL.ERROR:
        console.error(`[${level}] - ${this.name} ${message}`, error);
        break;
      case LOG_LEVEL.WARN:
        console.warn(`[${level}] - ${this.name} ${message}`);
        break;
      default:
        break;
    }
  }

  debug(message: string, error?: Error): void {
    this.log(LOG_LEVEL.DEBUG, message, error);
  }

  info(message: string): void {
    this.log(LOG_LEVEL.INFO, message);
  }

  warn(message: string): void {
    this.log(LOG_LEVEL.WARN, message);
  }

  error(message: string, error?: Error): void {
    this.log(LOG_LEVEL.ERROR, message, error);
  }
}

export const getLogger = (category: LoggerCategory) =>
  new Logger(`AmplifyUI:${category}`);
