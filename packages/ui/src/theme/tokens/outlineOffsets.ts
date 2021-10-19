import { DesignToken } from './types/designToken';

export interface OutlineOffsets {
  small: DesignToken;
  medium: DesignToken;
  large: DesignToken;
}

export const outlineOffsets: OutlineOffsets = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
