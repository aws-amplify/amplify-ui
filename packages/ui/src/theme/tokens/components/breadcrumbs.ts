import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

export type BreadcrumbsTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<
    'gap' | 'flexDirection' | 'flexWrap' | 'color',
    OutputType
  > & {
    item?: DesignTokenProperties<
      'color' | 'fontSize' | 'alignItems' | 'lineHeight' | 'flexDirection',
      OutputType
    >;
    separator?: DesignTokenProperties<
      'color' | 'fontSize' | 'paddingInline',
      OutputType
    >;
    link?: DesignTokenProperties<
      | 'color'
      | 'fontSize'
      | 'fontWeight'
      | 'paddingInline'
      | 'paddingBlock'
      | 'textDecoration',
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
  flexWrap: { value: 'wrap' },
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
    paddingInline: { value: '{space.xxs}' },
  },

  link: {
    color: { value: '{components.link.color}' },
    fontSize: { value: 'inherit' },
    fontWeight: { value: 'normal' },
    textDecoration: { value: 'none' },
    paddingInline: { value: '{space.xs}' },
    paddingBlock: { value: '{space.xxs}' },

    current: {
      color: { value: 'inherit' },
      fontSize: { value: 'inherit' },
      fontWeight: { value: 'normal' },
      textDecoration: { value: 'none' },
    },
  },
};
