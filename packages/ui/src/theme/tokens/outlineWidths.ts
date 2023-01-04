import {
  DesignTokenValues,
  OutlineWidthValue,
  OutputVariantKey,
} from './types/designToken';

type OutlineWidthSize = 'small' | 'medium' | 'large';

export type OutlineWidths<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<OutlineWidthSize, OutlineWidthValue, Output, Platform>;

export const outlineWidths: OutlineWidths<'default'> = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
