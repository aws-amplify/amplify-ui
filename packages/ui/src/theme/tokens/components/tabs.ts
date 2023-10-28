import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type TabItemStateTokens<OutputType> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'boxShadow' | 'color',
  OutputType
>;

type TabItemTokens<OutputType extends OutputVariantKey> = DesignTokenProperties<
  | 'backgroundColor'
  | 'borderColor'
  | 'borderStyle'
  | 'borderWidth'
  | 'color'
  | 'fontSize'
  | 'fontWeight'
  | 'paddingVertical'
  | 'paddingHorizontal'
  | 'textAlign'
  | 'transitionDuration',
  OutputType
> & {
  _hover?: TabItemStateTokens<OutputType>;
  _focus?: TabItemStateTokens<OutputType>;
  _active?: TabItemStateTokens<OutputType>;
  _disabled?: TabItemStateTokens<OutputType>;
};

export type TabsTokens<Output extends OutputVariantKey> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'borderStyle' | 'borderWidth' | 'gap',
  Output
> & {
  item?: TabItemTokens<Output>;
  panel?: DesignTokenProperties<
    'backgroundColor' | 'paddingInline' | 'paddingBlock',
    Output
  >;
};

export const tabs: Required<TabsTokens<'default'>> = {
  backgroundColor: { value: 'transparent' },
  borderColor: { value: '{colors.border.secondary.value}' },
  borderStyle: { value: 'solid' },
  borderWidth: { value: '{borderWidths.medium.value}' },
  gap: { value: '0' },

  item: {
    backgroundColor: { value: 'transparent' },
    borderColor: { value: '{colors.border.secondary.value}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.medium.value}' },
    color: { value: '{colors.font.secondary.value}' },
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.bold.value}' },
    paddingVertical: { value: '{space.small.value}' },
    paddingHorizontal: { value: '{space.medium.value}' },
    textAlign: { value: 'center' },
    transitionDuration: { value: '{time.medium.value}' },

    _hover: {
      backgroundColor: { value: 'transparent' },
      borderColor: { value: '{colors.border.focus.value}' },
      boxShadow: { value: 'none' },
      color: { value: '{colors.font.hover.value}' },
    },
    _focus: {
      backgroundColor: { value: 'transparent' },
      borderColor: { value: '{colors.border.focus.value}' },
      boxShadow: {
        value: {
          offsetX: '0px',
          offsetY: '0px',
          blurRadius: '0px',
          spreadRadius: '{borderWidths.medium}',
          color: '{colors.border.focus.value}',
        },
      },
      color: { value: '{colors.font.focus.value}' },
    },
    _active: {
      backgroundColor: { value: 'transparent' },
      borderColor: { value: '{colors.font.interactive.value}' },
      boxShadow: { value: 'none' },
      color: { value: '{colors.font.interactive.value}' },
    },
    _disabled: {
      backgroundColor: { value: 'transparent' },
      borderColor: { value: '{colors.border.tertiary.value}' },
      boxShadow: { value: 'none' },
      color: { value: '{colors.font.disabled.value}' },
    },
  },
  panel: {
    backgroundColor: { value: 'transparent' },
    paddingInline: { value: '0' },
    paddingBlock: { value: '{space.small.value}' },
  },
};
