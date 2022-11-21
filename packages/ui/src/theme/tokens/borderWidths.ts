import {
  BorderWidthValue,
  DesignTokenValues,
  OutputVariantKey,
} from './types/designToken';

type BorderWidthSize = 'small' | 'medium' | 'large';

export type BorderWidths<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = Output extends 'required' | 'default'
  ? Required<
      DesignTokenValues<
        BorderWidthSize,
        BorderWidthValue<Platform, Output>,
        Output,
        Platform
      >
    >
  : Partial<
      DesignTokenValues<
        BorderWidthSize,
        BorderWidthValue<Platform, Output>,
        Output,
        Platform
      >
    >;

export const borderWidths: BorderWidths<'default'> = {
  small: { value: '1px' },
  medium: { value: '2px' },
  large: { value: '3px' },
};
