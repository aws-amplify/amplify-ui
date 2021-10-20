import { DesignToken } from './types/designToken';

export interface BorderWidths {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
}

export const borderWidths: BorderWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
