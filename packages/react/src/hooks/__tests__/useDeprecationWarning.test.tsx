import { renderHook } from '@testing-library/react-hooks';
import { useDeprecationWarning } from '../useDeprecationWarning';

// add empty mockImplementation to prevent logging output to the console
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

const message = 'This component is deprecated, use X instead';
const shouldWarn = true;

describe('useDeprecationWarning', () => {
  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it('should log a warning in the happy path', () => {
    renderHook(() => useDeprecationWarning({ shouldWarn, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(message);
  });

  it('should log a warning if process is not defined', () => {
    const originalProcess = global.process;

    // ignore the below as this test is meant to test behavior that TS does not support
    // @ts-ignore
    delete global.process;

    renderHook(() => useDeprecationWarning({ shouldWarn, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(message);

    global.process = originalProcess;
  });

  it('should not log a warning if NODE_ENV is "production"', () => {
    const originalNodeEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';

    renderHook(() => useDeprecationWarning({ shouldWarn, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(message);

    // clean up
    process.env.NODE_ENV = originalNodeEnv;
  });
});
