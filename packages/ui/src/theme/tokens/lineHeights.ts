import { DesignToken } from './types/designToken';

export interface LineHeights {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
}

export const lineHeights: LineHeights = {
  small: { value: '1.5' },
  medium: { value: '1.8' },
  large: { value: '2' },
};
