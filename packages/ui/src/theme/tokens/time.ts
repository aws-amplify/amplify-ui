import { DesignToken, WebDesignToken, TimeValue } from './types/designToken';

type TimeKeys = 'short' | 'medium' | 'long';

export type Time = {
  transition: {
    short: DesignToken<TimeValue>;
    medium: DesignToken<TimeValue>;
    long: DesignToken<TimeValue>;
  };
};

export type WebTime = {
  transition: {
    [Property in keyof Time['transition']]: WebDesignToken<TimeValue>;
  };
};

export const time: Time = {
  transition: {
    short: { value: '100ms' },
    medium: { value: '250ms' },
    long: { value: '500ms' },
  },
};
