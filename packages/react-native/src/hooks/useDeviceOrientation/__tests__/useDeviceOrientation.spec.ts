import { Dimensions, EventSubscription } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import useDeviceOrientation, {
  DeviceOrientation,
} from '../useDeviceOrientation';

const dimensions = {
  landscape: { height: 100, width: 300 },
  portrait: { height: 300, width: 100 },
};

describe('useDeviceOrientation', () => {
  const subscription: Pick<EventSubscription, 'remove'> = { remove: jest.fn() };

  let getSpy: jest.SpyInstance;
  let addEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();

    getSpy = jest.spyOn(Dimensions, 'get');

    addEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');
  });

  it('should handle listener removal as expected', () => {
    getSpy.mockImplementation((_: string) => dimensions['landscape']);
    addEventListenerSpy.mockReturnValue(subscription);

    const { unmount } = renderHook(() => useDeviceOrientation());

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('screen');
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    unmount();

    expect(subscription.remove).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['landscape', true, false],
    ['portrait', false, true],
  ])(
    'returns the expected values when the device is in %s mode',
    (deviceOrientation, isLandscapeMode, isPortraitMode) => {
      getSpy.mockImplementation(
        (_: string) => dimensions[deviceOrientation as DeviceOrientation]
      );

      const { result } = renderHook(() => useDeviceOrientation());

      expect(result.current.deviceOrientation).toBe(deviceOrientation);
      expect(result.current.isLandscapeMode).toBe(isLandscapeMode);
      expect(result.current.isPortraitMode).toBe(isPortraitMode);
    }
  );
});
