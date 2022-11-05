import {
  DesignToken,
  WebDesignToken,
  OutlineOffsetValue,
} from './types/designToken';

type OffsetSize = 'small' | 'medium' | 'large';

export type OutlineOffsets<
  DesignTokenType = DesignToken<OutlineOffsetValue> | OutlineOffsetValue
> = Record<OffsetSize, DesignTokenType>;

export type WebOutlineOffsets = OutlineOffsets<
  WebDesignToken<OutlineOffsetValue>
>;

export const outlineOffsets: OutlineOffsets = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
