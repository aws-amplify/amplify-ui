import { getLogger } from '../logger';

const logger = getLogger('Auth');
logger.level = 'INFO';

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

const mockMessage = 'test message';
const mockError = new Error('test');

describe('logger', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete (window as any).LOG_LEVEL;
  });

  it('should log error messages', () => {
    logger.error(mockMessage, mockError);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage),
      mockError
    );
  });

  it('should log warning messages', () => {
    logger.warn(mockMessage);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage)
    );
  });

  it('should log info messages', () => {
    (window as any).LOG_LEVEL = 'INFO';
    logger.info(mockMessage);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('INFO'));
  });

  it('should log debug messages', () => {
    (window as any).LOG_LEVEL = 'DEBUG';
    logger.debug(mockMessage);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('DEBUG')
    );
  });
});
