import { DesignTokenValues, LineHeightValue } from './types/designToken';

type LineHeightSize = 'small' | 'medium' | 'large';

export type LineHeights<
  Output = unknown,
  Platform = unknown
> = DesignTokenValues<LineHeightSize, LineHeightValue, Output, Platform>;

export const lineHeights: LineHeights = {
  small: { value: '1.25' },
  medium: { value: '1.5' },
  large: { value: '2' },
};
