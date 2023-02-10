import { useLayoutEffect, useState } from 'react';
import { isPortrait, isMobileScreen } from '../utils/device';

interface UseMediaDimensionsResults {
  width: number;
  height: number;
}

/**
 * Calculate video dimensions based on the width and height values
 * supplied in LivenessCameraModule from getUserMedia.
 * In our testing, some devices and browser combos on mobile return
 * opposite values than you would expect from getUserMedia so we need
 * to manually test dimensions before setting the mediaWidth/Height
 * for portrait and landscape.
 * Known affected browsers:
 * - Firefox on Android
 * - iOS
 */
export function useMediaDimensions(
  videoWidth: number,
  videoHeight: number
): UseMediaDimensionsResults {
  const [width, setWidth] = useState<number>(videoWidth);
  const [height, setHeight] = useState<number>(videoHeight);

  useLayoutEffect(() => {
    if (isMobileScreen()) {
      if (isPortrait()) {
        setWidth(videoWidth < videoHeight ? videoWidth : videoHeight);
        setHeight(videoWidth < videoHeight ? videoHeight : videoWidth);
      } else {
        setWidth(videoWidth > videoHeight ? videoWidth : videoHeight);
        setHeight(videoWidth > videoHeight ? videoHeight : videoWidth);
      }
    } else {
      setWidth(videoWidth);
      setHeight(videoHeight);
    }
  }, [videoWidth, videoHeight]);

  return { width, height };
}
