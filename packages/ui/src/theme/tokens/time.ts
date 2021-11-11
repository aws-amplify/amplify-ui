import { DesignToken, WebDesignToken, TimeValue } from './types/designToken';

export type Time = {
  short: DesignToken<TimeValue>;
  medium: DesignToken<TimeValue>;
  long: DesignToken<TimeValue>;
};

export type WebTime = {
  [Property in keyof Time]: WebDesignToken<TimeValue>;
};

export const time: Time = {
  short: { value: '100ms' },
  medium: { value: '250ms' },
  long: { value: '500ms' },
};
