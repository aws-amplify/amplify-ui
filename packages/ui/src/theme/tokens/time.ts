import { DesignToken, WebDesignToken, TimeValue } from './types/designToken';

type Duration = 'short' | 'medium' | 'long';

export type Time = Record<Duration, DesignToken<TimeValue> | TimeValue>;

export type WebTime = Record<Duration, WebDesignToken<TimeValue>>;

export type ReactNativeTime = Record<Duration, number>;

export const time: Time = {
  short: { value: '100ms' },
  medium: { value: '250ms' },
  long: { value: '500ms' },
};
