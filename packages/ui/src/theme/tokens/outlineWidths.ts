import type {
  DesignTokenValues,
  OutlineWidthValue,
  OutputVariantKey,
  RecursiveDesignToken,
} from './types/designToken';

type OutlineWidthSize = 'small' | 'medium' | 'large';

export type OutlineWidths<
  Output extends OutputVariantKey = unknown,
  Platform = unknown,
> = DesignTokenValues<OutlineWidthSize, OutlineWidthValue, Output, Platform> &
  RecursiveDesignToken<OutlineWidthValue, Output, Platform>;

export const outlineWidths: OutlineWidths<'default'> = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
