import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type BreadcrumbsTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<'gap' | 'flexDirection' | 'color', OutputType> & {
    item?: DesignTokenProperties<
      'color' | 'fontSize' | 'alignItems' | 'lineHeight',
      OutputType
    >;
    separator?: DesignTokenProperties<'color' | 'fontSize', OutputType>;
    link?: DesignTokenProperties<
      'paddingBlock' | 'paddingInline',
      OutputType
    > & {
      current?: DesignTokenProperties<'color' | 'fontSize', OutputType>;
    };
  };

export const breadcrumbs: Required<BreadcrumbsTokens<'default'>> = {
  flexDirection: { value: 'row' },
  gap: { value: '{space.medium}' },
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
  },

  link: {
    paddingBlock: { value: '{space.xs}' },
    paddingInline: { value: '{space.small}' },
    current: {
      color: { value: 'inherit' },
      fontSize: { value: 'inherit' },
    },
  },
};
