import {
  DesignTokenValues,
  OutputVariantKey,
  ShadowValue,
} from './types/designToken';

type ShadowSize = 'small' | 'medium' | 'large';

export type Shadows<
  Output extends OutputVariantKey = unknown,
  Platform = unknown
> = DesignTokenValues<ShadowSize, ShadowValue, Output, Platform>;

export const shadows: Shadows<'default'> = {
  small: {
    value: {
      offsetX: '0px',
      offsetY: '2px',
      blurRadius: '4px',
      color: '{colors.shadow.tertiary.value}',
    },
  },
  medium: {
    value: {
      offsetX: '0px',
      offsetY: '2px',
      blurRadius: '6px',
      color: '{colors.shadow.secondary.value}',
    },
  },
  large: {
    value: {
      offsetX: '0px',
      offsetY: '4px',
      blurRadius: '12px',
      color: '{colors.shadow.primary.value}',
    },
  },
};
