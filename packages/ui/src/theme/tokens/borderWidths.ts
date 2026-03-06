import type {
  DesignTokenValues,
  OutputVariantKey,
  RecursiveDesignToken,
  SpaceValue,
} from './types/designToken';

type BorderWidthSize = 'small' | 'medium' | 'large';

export type BorderWidths<
  Output extends OutputVariantKey = unknown,
  Platform = unknown,
> = (Output extends 'required' | 'default'
  ? Required<
      DesignTokenValues<
        BorderWidthSize,
        SpaceValue<Platform, Output>,
        Output,
        Platform
      >
    >
  : Partial<
      DesignTokenValues<
        BorderWidthSize,
        SpaceValue<Platform, Output>,
        Output,
        Platform
      >
    >) &
  RecursiveDesignToken<SpaceValue<Platform, Output>, Output, Platform>;

export const borderWidths: BorderWidths<'default'> = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
