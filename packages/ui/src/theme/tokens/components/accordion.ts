import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type AccordionTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'backgroundColor', Output> & {
    item?: DesignTokenProperties<
      'borderWidth' | 'borderStyle' | 'borderColor',
      Output
    > & {
      icon?: DesignTokenProperties<
        'transitionDuration' | 'transitionTimingFunction',
        Output
      >;
      content?: DesignTokenProperties<
        'color' | 'paddingInline' | 'paddingBlockEnd' | 'paddingBlockStart',
        Output
      >;
      trigger?: DesignTokenProperties<
        | 'alignItems'
        | 'backgroundColor'
        | 'paddingInline'
        | 'paddingBlock'
        | 'justifyContent'
        | 'color',
        Output
      > & {
        _hover?: DesignTokenProperties<'backgroundColor' | 'color', Output>;
        _focus?: DesignTokenProperties<'boxShadow' | 'borderColor', Output>;
      };
    };
  };

export const accordion: Required<AccordionTokens<'default'>> = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  item: {
    borderColor: { value: '{colors.border.secondary.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    trigger: {
      alignItems: { value: 'center' },
      color: { value: '{colors.font.secondary.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      justifyContent: { value: 'space-between' },
      paddingBlock: { value: '{space.xs.value}' },
      paddingInline: { value: '{space.small.value}' },
      _hover: {
        color: { value: '{colors.font.secondary.value}' },
        backgroundColor: { value: '{colors.overlay.10.value}' },
      },
      _focus: {
        borderColor: { value: '{colors.border.focus.value}' },
        boxShadow: {
          value: {
            offsetX: '0',
            offsetY: '0',
            blurRadius: '0',
            spreadRadius: '2px',
            color: '{colors.border.focus.value}',
          },
        },
      },
    },
    content: {
      color: { value: '{colors.font.secondary.value}' },
      paddingInline: { value: '{space.small.value}' },
      paddingBlockEnd: { value: '{space.small.value}' },
      paddingBlockStart: { value: '{space.xxxs.value}' },
    },
    icon: {
      transitionDuration: { value: '{time.medium.value}' },
      transitionTimingFunction: { value: 'cubic-bezier(0.87, 0, 0.13, 1)' },
    },
  },
};
