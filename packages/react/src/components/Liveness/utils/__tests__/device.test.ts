import {
  isIOS,
  isMobileScreen,
  isPortrait,
  getLandscapeMediaQuery,
} from '../device';
import { mockMatchMedia } from '../test-utils';

const GOOGLE_PIXEL_FIREFOX =
  'Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Firefox/94.0.4606.71 Mobile Safari/537.36';
const GOOGLE_PIXEL_CHROME =
  'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19';
const IPHONE_12_SAFARI =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1';
const NEW_IPAD =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15';
const OLD_IPAD =
  'Mozilla/5.0 (iPad; CPU OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1';

describe('device', () => {
  const { userAgent: originalUserAgent } = window.navigator;

  beforeAll(() => {
    Object.defineProperty(
      window.navigator,
      'userAgent',
      ((value) => ({
        get() {
          return value;
        },
        set(v) {
          value = v;
        },
      }))(window.navigator['userAgent'])
    );
  });

  afterAll(() => {
    Object.defineProperty(window, 'navigator', {
      configurable: true,
      value: originalUserAgent,
    });
  });

  it('isMobileScreen', () => {
    (global.navigator as any).userAgent = GOOGLE_PIXEL_CHROME;
    expect(isMobileScreen()).toBe(true);

    (global.navigator as any).userAgent = GOOGLE_PIXEL_FIREFOX;
    expect(isMobileScreen()).toBe(true);

    (global.navigator as any).userAgent = IPHONE_12_SAFARI;
    expect(isMobileScreen()).toBe(true);

    (global.navigator as any).userAgent = OLD_IPAD;
    expect(isMobileScreen()).toBe(true);
  });

  it('isMobileScreen NEW_IPAD', () => {
    (global.navigator as any).userAgent = NEW_IPAD;
    expect(isMobileScreen()).toBe(false);

    (global.navigator as any).userAgent = NEW_IPAD;
    (global.navigator as any).maxTouchPoints = 2;
    expect(isMobileScreen()).toBe(true);

    (global.navigator as any).userAgent = NEW_IPAD;
    (global.navigator as any).maxTouchPoints = 1;
    expect(isMobileScreen()).toBe(false);
  });

  it('isIOS', () => {
    (global.navigator as any).userAgent = NEW_IPAD;
    (global.navigator as any).maxTouchPoints = 2;
    expect(isIOS()).toBe(true);

    (global.navigator as any).userAgent = IPHONE_12_SAFARI;
    expect(isIOS()).toBe(true);

    (global.navigator as any).userAgent = GOOGLE_PIXEL_CHROME;
    expect(isIOS()).toBe(false);
  });
});

describe('orientation', () => {
  it('is in portrait orientation', () => {
    mockMatchMedia('(orientation: portrait)', true);
    expect(isPortrait()).toBe(true);
  });
  it('is not in portrait orientation', () => {
    mockMatchMedia('(orientation: portrait)', false);
    expect(isPortrait()).toBe(false);
  });
  it('return MediaQueryList for landscape orientation when in landscape', () => {
    mockMatchMedia('(orientation: landscape)', true);
    expect(getLandscapeMediaQuery().matches).toBe(true);
    expect(getLandscapeMediaQuery().media).toBe('(orientation: landscape)');
  });
});
