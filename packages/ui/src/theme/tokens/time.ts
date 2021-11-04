import { DesignToken } from './types/designToken';

export interface Time {
  animation: {
    short: DesignToken;
    medium: DesignToken;
    long: DesignToken;
  };
  transition: {
    short: DesignToken;
    medium: DesignToken;
    long: DesignToken;
  };
}

export const time: Time = {
  animation: {
    short: { value: '100ms' },
    medium: { value: '250ms' },
    long: { value: '500ms' },
  },
  transition: {
    short: { value: '100ms' },
    medium: { value: '250ms' },
    long: { value: '500ms' },
  },
};
