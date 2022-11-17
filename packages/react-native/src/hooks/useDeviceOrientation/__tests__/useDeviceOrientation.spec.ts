import { Dimensions, EventSubscription, ScaledSize } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import useDeviceOrientation from '../useDeviceOrientation';

const dimensions = {
  landscape: { height: 100, width: 300 },
  portrait: { height: 300, width: 100 },
};

describe('useDeviceOrientation', () => {
  const subscription: Pick<EventSubscription, 'remove'> = { remove: jest.fn() };

  let getSpy: jest.SpyInstance;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListener: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();

    getSpy = jest.spyOn(Dimensions, 'get');

    addEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');

    removeEventListener = jest.spyOn(Dimensions, 'removeEventListener');
  });

  /* eslint-disable no-console */
  // turn off console errors during tests, can be safely removed once React Native v0.64 is no longer supported
  const consoleWarn = console.warn;
  console.warn = jest.fn();
  afterAll(() => {
    console.warn = consoleWarn;
    /* eslint-enable no-console */
  });

  it('should handle unsubscribing for React Native versions < 0.65', () => {
    getSpy.mockImplementation((_: string) => dimensions['portrait']);

    // mock an `undefined` return to simulate React Native versions < 0.65
    addEventListenerSpy.mockReturnValueOnce(undefined);

    const { unmount } = renderHook(() => useDeviceOrientation());

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('screen');
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    unmount();

    expect(removeEventListener).toHaveBeenCalledTimes(1);
    expect(subscription.remove).not.toHaveBeenCalled();
  });

  it('should handle unsubscribing for React Native versions >= 0.65', () => {
    getSpy.mockImplementation((_: string) => dimensions['landscape']);
    addEventListenerSpy.mockReturnValue(subscription);

    const { unmount } = renderHook(() => useDeviceOrientation());

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('screen');
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    unmount();

    expect(subscription.remove).toHaveBeenCalledTimes(1);
    expect(removeEventListener).not.toHaveBeenCalled();
  });

  it.each([
    ['landscape', true, false],
    ['portrait', false, true],
  ])(
    'returns the expected values when the device is in %s mode',
    (deviceOrientation, isLandscapeMode, isPortraitMode) => {
      getSpy.mockImplementation(
        (_: string) => dimensions[deviceOrientation] as ScaledSize
      );

      const { result } = renderHook(() => useDeviceOrientation());

      expect(result.current.deviceOrientation).toBe(deviceOrientation);
      expect(result.current.isLandscapeMode).toBe(isLandscapeMode);
      expect(result.current.isPortraitMode).toBe(isPortraitMode);
    }
  );
});
