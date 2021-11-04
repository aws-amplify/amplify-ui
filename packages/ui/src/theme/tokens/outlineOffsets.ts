import {
  DesignToken,
  WebDesignToken,
  OutlineOffsetValue,
} from './types/designToken';

type OutlineOffsetKeys = 'small' | 'medium' | 'large';

export type OutlineOffsets = {
  [key in OutlineOffsetKeys]: DesignToken<OutlineOffsetValue>;
};

export type WebOutlineOffsets = {
  [key in OutlineOffsetKeys]: WebDesignToken<OutlineOffsetValue>;
};

export const outlineOffsets: OutlineOffsets = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
