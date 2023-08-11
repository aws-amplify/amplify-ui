import { renderHook } from '@testing-library/react-hooks';
import useDeprecationWarning from '../useDeprecationWarning';

// add empty mockImplementation to prevent logging output to the console
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

const message = 'This component is deprecated, use X instead';

describe('useDeprecationWarning', () => {
  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it('should log a warning in the happy path', () => {
    renderHook(() => useDeprecationWarning({ shouldWarn: true, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(message);
  });

  it('should not log a warning if `shouldWarn` is `false`', () => {
    renderHook(() => useDeprecationWarning({ message, shouldWarn: false }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(message);
  });

  it('should not log a warning if `shouldWarn` is `undefined`', () => {
    renderHook(() =>
      useDeprecationWarning({
        message,
        shouldWarn: undefined as unknown as boolean,
      })
    );
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(message);
  });
});
