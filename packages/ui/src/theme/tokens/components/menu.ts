import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type MenuSizeTokens<Output> = DesignTokenProperties<'width' | 'height', Output>;

export type MenuTokens<Output extends OutputVariantKey> = DesignTokenProperties<
  | 'backgroundColor'
  | 'borderColor'
  | 'borderRadius'
  | 'borderStyle'
  | 'borderWidth'
  | 'boxShadow'
  | 'flexDirection'
  | 'gap'
  | 'maxWidth'
  | 'minWidth',
  Output
> & {
  small?: MenuSizeTokens<Output>;
  large?: MenuSizeTokens<Output>;
  item?: DesignTokenProperties<
    'minHeight' | 'paddingInlineEnd' | 'paddingInlineStart',
    Output
  >;
};

export const menu: Required<MenuTokens<'default'>> = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  borderWidth: { value: '{borderWidths.small.value}' },
  borderStyle: { value: 'solid' },
  borderColor: { value: '{colors.border.primary.value}' },
  boxShadow: { value: '{shadows.large.value}' },
  flexDirection: { value: 'column' },
  gap: { value: '{space.zero.value}' },
  maxWidth: { value: '30rem' },
  minWidth: { value: '14rem' },

  small: {
    width: { value: '{fontSizes.medium.value}' },
    height: { value: '{fontSizes.medium.value}' },
  },
  large: {
    width: { value: '{fontSizes.xxxl.value}' },
    height: { value: '{fontSizes.xxxl.value}' },
  },
  item: {
    minHeight: { value: '2.5rem' },
    paddingInlineStart: { value: '{space.medium.value}' },
    paddingInlineEnd: { value: '{space.medium.value}' },
  },
};
