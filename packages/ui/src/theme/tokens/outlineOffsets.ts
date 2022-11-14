import {
  DesignTokenValues,
  OutlineOffsetValue,
  OutputVariantKey,
} from './types/designToken';

type OutlineOffsetSize = 'small' | 'medium' | 'large';

export type OutlineOffsets<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<OutlineOffsetSize, OutlineOffsetValue, Output, Platform>;

export const outlineOffsets: OutlineOffsets<'default'> = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
