import { DesignTokenValues, OutlineWidthValue } from './types/designToken';

type OutlineWidthSize = 'small' | 'medium' | 'large';

export type OutlineWidths<
  Output = unknown,
  Platform = unknown
> = DesignTokenValues<OutlineWidthSize, OutlineWidthValue, Output, Platform>;

export const outlineWidths: OutlineWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
