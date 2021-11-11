import { DesignToken } from './types/designToken';

export interface Time {
  short: DesignToken;
  medium: DesignToken;
  long: DesignToken;
}

export const time: Time = {
  short: { value: '100ms' },
  medium: { value: '250ms' },
  long: { value: '500ms' },
};
