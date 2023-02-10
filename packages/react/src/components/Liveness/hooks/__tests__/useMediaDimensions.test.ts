import { renderHook } from '@testing-library/react-hooks';

import { useMediaDimensions } from '../useMediaDimensions';
import { getMockedFunction } from '../../utils/test-utils';
import { isMobileScreen, isPortrait } from '../../utils/device';

jest.mock('../../utils/device');
const mockIsMobileScreen = getMockedFunction(isMobileScreen);
const mockIsPortrait = getMockedFunction(isPortrait);

describe('useMediaDimensions mobile portrait', () => {
  beforeEach(() => {
    mockIsMobileScreen.mockReturnValue(true);
    mockIsPortrait.mockReturnValue(true);
  });
  it('should return portrait sized dimensions when width is less than height', () => {
    const videoWidth = 360;
    const videoHeight = 640;

    const { result } = renderHook(() => {
      return useMediaDimensions(videoWidth, videoHeight);
    });

    expect(result.current.width).toBe(360);
    expect(result.current.height).toBe(640);
  });
  it('should return portrait sized dimensions when width is greater than height', () => {
    const videoWidth = 640;
    const videoHeight = 360;

    const { result } = renderHook(() => {
      return useMediaDimensions(videoWidth, videoHeight);
    });

    expect(result.current.width).toBe(360);
    expect(result.current.height).toBe(640);
  });
});

describe('useMediaDimensions mobile landscape', () => {
  beforeEach(() => {
    mockIsMobileScreen.mockReturnValue(true);
    mockIsPortrait.mockReturnValue(false);
  });
  it('should return landscape sized dimensions when width is greater than height', () => {
    const videoWidth = 640;
    const videoHeight = 480;

    const { result } = renderHook(() => {
      return useMediaDimensions(videoWidth, videoHeight);
    });

    expect(result.current.width).toBe(640);
    expect(result.current.height).toBe(480);
  });
  it('should return portrait sized dimensions when width is less than height', () => {
    const videoWidth = 480;
    const videoHeight = 640;

    const { result } = renderHook(() => {
      return useMediaDimensions(videoWidth, videoHeight);
    });

    expect(result.current.width).toBe(640);
    expect(result.current.height).toBe(480);
  });
});

describe('useMediaDimensions desktop', () => {
  it('should return videoWidth and videoHeight as width and height on portrait', () => {
    mockIsMobileScreen.mockReturnValue(false);
    mockIsPortrait.mockReturnValue(true);

    const videoWidth = 640;
    const videoHeight = 480;

    const { result } = renderHook(() => {
      return useMediaDimensions(videoWidth, videoHeight);
    });

    expect(result.current.width).toBe(videoWidth);
    expect(result.current.height).toBe(videoHeight);
  });

  it('should return videoWidth and videoHeight as width and height on landscape', () => {
    mockIsMobileScreen.mockReturnValue(false);
    mockIsPortrait.mockReturnValue(true);

    const videoWidth = 480;
    const videoHeight = 640;

    const { result } = renderHook(() => {
      return useMediaDimensions(videoWidth, videoHeight);
    });

    expect(result.current.width).toBe(videoWidth);
    expect(result.current.height).toBe(videoHeight);
  });
});
