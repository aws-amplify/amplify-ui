import { DesignToken } from './types/designToken';

export interface OutlineWidths {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
}

export const outlineWidths: OutlineWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
