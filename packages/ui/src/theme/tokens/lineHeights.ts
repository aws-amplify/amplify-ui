import {
  DesignTokenValues,
  LineHeightValue,
  OutputVariantKey,
} from './types/designToken';

type LineHeightSize = 'small' | 'medium' | 'large';

export type LineHeights<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<LineHeightSize, LineHeightValue, Output, Platform>;

export const lineHeights: LineHeights<'default'> = {
  small: { value: '1.25' },
  medium: { value: '1.5' },
  large: { value: '2' },
};
