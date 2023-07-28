import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type BreadcrumbsTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<'gap' | 'flexDirection' | 'color', OutputType> & {
    item?: DesignTokenProperties<
      'color' | 'fontSize' | 'alignItems' | 'lineHeight' | 'flexDirection',
      OutputType
    >;
    separator?: DesignTokenProperties<
      'color' | 'fontSize' | 'paddingInline',
      OutputType
    >;
    link?: DesignTokenProperties<
      'color' | 'fontSize' | 'fontWeight' | 'textDecoration',
      OutputType
    > & {
      current?: DesignTokenProperties<
        'color' | 'fontSize' | 'fontWeight' | 'textDecoration',
        OutputType
      >;
    };
  };

export const breadcrumbs: Required<BreadcrumbsTokens<'default'>> = {
  flexDirection: { value: 'row' },
  gap: { value: '0' },
  color: { value: '{colors.font.tertiary}' },

  item: {
    flexDirection: { value: 'row' },
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
    color: { value: '{components.link.color}' },
    fontSize: { value: 'inherit' },
    fontWeight: { value: 'normal' },
    textDecoration: { value: 'none' },

    current: {
      color: { value: '{components.link.active.color}' },
      fontSize: { value: 'inherit' },
      fontWeight: { value: 'normal' },
      textDecoration: { value: 'none' },
    },
  },
};
