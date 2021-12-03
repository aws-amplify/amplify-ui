export function getVideoConstraints(
  isMobileScreen: boolean,
  contentWidth: number
): MediaTrackConstraints | null {
  if (isMobileScreen && contentWidth < 485) {
    const isPortrait = screen.orientation.type.includes('portrait');

    // opposite values of width/height are used because getMediaStream handles the aspect ratio on mobile
    return {
      width: {
        min: 320,
        ideal: 640,
        max: isPortrait ? window.innerHeight : window.innerWidth,
      },
      height: {
        min: 240,
        ideal: 480,
        max: isPortrait ? window.innerWidth : window.innerHeight,
      },
      facingMode: 'user',
    };
  } else {
    return {
      width: {
        min: 320,
        ideal: 640,
        max: Math.min(contentWidth, 1920),
      },
      height: {
        min: 240,
        ideal: 480,
        max: 1080,
      },
      facingMode: 'user',
    };
  }
}
