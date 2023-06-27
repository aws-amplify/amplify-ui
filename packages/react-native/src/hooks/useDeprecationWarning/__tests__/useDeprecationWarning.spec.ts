import { renderHook } from '@testing-library/react-hooks';

import { platform } from '../../../utils';
import useDeprecationWarning from '../useDeprecationWarning';

const mockIsDev = jest.fn();
jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
  IS_DEV: mockIsDev,
}));

// add empty mockImplementation to prevent logging output to the console
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

const message = 'This component is deprecated, use X instead';
const shouldWarn = true;

describe('useDeprecationWarning', () => {
  beforeAll(() => {
    platform.IS_DEV = true;
  });

  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it('should log an error if `shouldWarn` is set to `true` and `__DEV__` is `true`', () => {
    renderHook(() => useDeprecationWarning({ shouldWarn, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(message);
  });

  it('should not log an error if `shouldWarn` is set to `true` and `__DEV__` is `false`', () => {
    const message = 'This component is deprecated, use X instead';

    platform.IS_DEV = false;

    renderHook(() => useDeprecationWarning({ shouldWarn, message }));
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).not.toHaveBeenCalledWith(message);
  });
});
