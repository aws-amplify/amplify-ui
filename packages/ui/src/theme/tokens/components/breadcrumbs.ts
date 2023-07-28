import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type BreadcrumbsTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<'gap' | 'flexDirection' | 'color', OutputType> & {
    item?: DesignTokenProperties<
      'color' | 'fontSize' | 'alignItems' | 'lineHeight',
      OutputType
    >;
    separator?: DesignTokenProperties<
      'color' | 'fontSize' | 'paddingInline',
      OutputType
    >;
    link?: {
      current?: DesignTokenProperties<'color' | 'fontSize', OutputType>;
    };
  };

export const breadcrumbs: Required<BreadcrumbsTokens<'default'>> = {
  flexDirection: { value: 'row' },
  gap: { value: '0' },
  color: { value: '{colors.font.tertiary}' },

  item: {
    color: { value: 'inherit' },
    fontSize: { value: 'inherit' },
    alignItems: { value: 'center' },
    lineHeight: { value: '1' },
  },

  separator: {
    color: { value: 'inherit' },
    fontSize: { value: 'inherit' },
    paddingInline: { value: '{space.small}' },
  },

  link: {
    current: {
      color: { value: 'inherit' },
      fontSize: { value: 'inherit' },
    },
  },
};
