import { DesignToken } from './types/designToken';

export interface LineHeights {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
}

export const lineHeights: LineHeights = {
  small: { value: '2' },
  medium: { value: '2.25' },
  large: { value: '2.5' },
};
