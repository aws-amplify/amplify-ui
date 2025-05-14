function isNewerIpad() {
  // iPads on iOS13+ return as if a desktop Mac
  // so check for maxTouchPoints also.
  return (
    /Macintosh/i.test(navigator.userAgent) &&
    !!navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 1
  );
}

export function isMobileScreen(): boolean {
  const isMobileDevice =
    // Test Android/iPhone/iPad
    /Android|iPhone|iPad/i.test(navigator.userAgent) || isNewerIpad();
  return isMobileDevice;
}

export async function isDeviceUserFacing(
  deviceId: string | undefined
): Promise<boolean> {
  const devices = await navigator.mediaDevices?.enumerateDevices();

  // Find the video input device with the matching deviceId
  const videoDevice = devices?.find(
    (device) => device.deviceId === deviceId && device.kind === 'videoinput'
  );

  if (videoDevice) {
    // Check if the device label contains the word "back"
    return !videoDevice.label.toLowerCase().includes('back');
  }

  // If the device is not found or not a video input device, return false
  return true;
}

export function isIOS(): boolean {
  const isIOS = isNewerIpad() || navigator.userAgent.indexOf('like Mac') != -1;
  return isIOS;
}

export function isPortrait(): boolean {
  return window.matchMedia('(orientation: portrait)').matches;
}

/**
 * Use window.matchMedia to direct landscape orientation
 * screen.orientation is not supported in Safari so we will use
 * media query detection to listen for changes instead.
 * @returns MediaQueryList object
 */
export function getLandscapeMediaQuery(): MediaQueryList {
  return window.matchMedia('(orientation: landscape)');
}

// minor version 146+ is confirmed to have the fix https://issues.chromium.org/issues/343199623#comment34
export function isAndroidChromeWithBrokenH264(): boolean {
  const groups = /Chrome\/125\.[0-9]+\.[0-9]+\.([0-9]+)/i.exec(
    navigator.userAgent
  );

  if (!groups) {
    return false;
  }

  const minorVersion = groups[1];

  return (
    /Android/i.test(navigator.userAgent) &&
    /Chrome\/125/i.test(navigator.userAgent) &&
    parseInt(minorVersion) < 146
  );
}
