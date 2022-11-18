import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type CopyTokens<Output extends OutputVariantKey> = DesignTokenProperties<
  'fontSize' | 'gap',
  Output
> & {
  svg?: { path?: DesignTokenProperties<'fill', Output> };
  toolTip?: DesignTokenProperties<'bottom' | 'color' | 'fontSize', Output>;
};

export const copy: Required<CopyTokens<'default'>> = {
  fontSize: { value: '{fontSizes.xs}' },
  gap: { value: '{space.relative.medium}' },

  svg: {
    path: {
      fill: {
        value: '{colors.font.primary}',
      },
    },
  },
  toolTip: {
    bottom: { value: '{space.large}' },
    color: { value: '{colors.teal.100}' },
    fontSize: { value: '{fontSizes.xxs}' },
  },
};
