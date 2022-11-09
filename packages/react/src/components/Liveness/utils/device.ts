export function isMobileScreen(): boolean {
  const isMobileDevice =
    // Test Android/iPhone/iPad
    /Android|iPhone|iPad/i.test(navigator.userAgent) ||
    // Test some versions of iPad that return as if desktop
    (/Macintosh/i.test(navigator.userAgent) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1);
  return isMobileDevice;
}

export function isIOS(): boolean {
  const isIOS =
    (/Macintosh/i.test(navigator.userAgent) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1) ||
    navigator.userAgent.indexOf('like Mac') != -1;
  return isIOS;
}
export function isAndroid(): boolean {
  return navigator.userAgent.indexOf('Android') != -1;
}
export function isFirefox(): boolean {
  return navigator.userAgent.indexOf('Firefox') != -1;
}

export function isPortrait(): boolean {
  return screen.orientation?.type?.includes('portrait') || true;
}
