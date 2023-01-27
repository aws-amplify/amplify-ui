import { renderHook } from '@testing-library/react-hooks';
import { useDeprecationWarning } from '../useDeprecationWarning';

// add empty mockImplementation to prevent logging output to the console
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

describe('useDeprecationWarning', () => {
  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it('should render message (shouldWarn true)', () => {
    const message = 'This component is deprecated, use X instead';

    renderHook(() => useDeprecationWarning({ shouldWarn: true, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(message);
  });

  it('should not render message if shouldWarn is false', () => {
    const message = 'This component is deprecated, use X instead';

    renderHook(() => useDeprecationWarning({ message, shouldWarn: false }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(message);
  });

  it('should not render message if shouldWarn is undefined', () => {
    const message = 'This component is deprecated, use X instead';

    renderHook(() =>
      useDeprecationWarning({
        message,
        shouldWarn: undefined as unknown as boolean,
      })
    );
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(message);
  });

  it('should not throw reference error if process is not defined', () => {
    const message = 'This component is deprecated, use X instead';

    const originalProcess = global.process;

    // ignore the below as this test is meant to test behavior that TS does not support
    // @ts-ignore
    delete global.process;

    renderHook(() => useDeprecationWarning({ shouldWarn: true, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(message);

    global.process = originalProcess;
  });
});
