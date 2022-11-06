import { BorderWidthValue, DesignTokenValues } from './types/designToken';

type BorderWidthSize = 'small' | 'medium' | 'large';

export type BorderWidths<Output = unknown> = DesignTokenValues<
  BorderWidthSize,
  BorderWidthValue,
  Output
>;

export const borderWidths: BorderWidths = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
