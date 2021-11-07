import {
  DesignToken,
  WebDesignToken,
  OutlineOffsetValue,
} from './types/designToken';

export type OutlineOffsets = {
  small: DesignToken<OutlineOffsetValue>;
  medium: DesignToken<OutlineOffsetValue>;
  large: DesignToken<OutlineOffsetValue>;
};

export type WebOutlineOffsets = {
  [Property in keyof OutlineOffsets]: WebDesignToken<OutlineOffsetValue>;
};

export const outlineOffsets: OutlineOffsets = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
