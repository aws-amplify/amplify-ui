export function getVideoConstraints(
  isMobileScreen: boolean,
  contentWidth: number
): MediaTrackConstraints | null {
  if (isMobileScreen && contentWidth < 485) {
    const isPortrait = screen.orientation?.type?.includes('portrait') || true;
    const isIOS = navigator.userAgent.indexOf('like Mac') != -1;

    // opposite values of width/height for non ios are used because getMediaStream handles the aspect ratio on mobile
    const idealHeight = isIOS ? window.innerHeight : 480;
    const idealWidth = isIOS ? window.innerWidth : 640;

    return {
      width: {
        min: 320,
        ideal: idealWidth,
        max: isPortrait ? window.innerHeight : window.innerWidth,
      },
      height: {
        min: 240,
        ideal: idealHeight,
        max: isPortrait ? window.innerWidth : window.innerHeight,
      },
      frameRate: { min: 15, ideal: 30, max: 30 },
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
      frameRate: { min: 10, ideal: 10, max: 10 },
      facingMode: 'user',
    };
  }
}
