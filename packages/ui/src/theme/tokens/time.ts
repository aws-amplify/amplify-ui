import { DesignToken, WebDesignToken, TimeValue } from './types/designToken';

type TimeKeys = 'short' | 'medium' | 'long';

export type Time = {
  transition: {
    [key in TimeKeys]: DesignToken<TimeValue>;
  };
};

export type WebTime = {
  transition: {
    [key in TimeKeys]: WebDesignToken<TimeValue>;
  };
};

export const time: Time = {
  transition: {
    short: { value: '100ms' },
    medium: { value: '250ms' },
    long: { value: '500ms' },
  },
};
