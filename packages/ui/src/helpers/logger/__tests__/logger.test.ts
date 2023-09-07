import { getLogger } from '../logger';

const logger = getLogger('Auth');

const consoleDebugSpy = jest
  .spyOn(console, 'debug')
  .mockImplementation(() => {});
const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});
const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

const mockMessage = 'test message';
const mockError = new Error('test');

describe('logger', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log error messages', () => {
    logger.error(mockMessage, mockError);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage),
      mockError
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleDebugSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    logger.warn(mockMessage);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage)
    );
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleDebugSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
  });

  it('should log info messages', () => {
    logger.info(mockMessage);
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage)
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleDebugSpy).not.toHaveBeenCalled();
  });

  it('should log debug messages', () => {
    logger.debug(mockMessage);
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringContaining(mockMessage),
      undefined
    );
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleInfoSpy).not.toHaveBeenCalled();
  });
});
