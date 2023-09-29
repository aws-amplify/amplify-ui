import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type AccordionItemTokens<Output> = DesignTokenProperties<
  'borderWidth' | 'borderStyle' | 'borderColor',
  Output
> & {
  _focus?: DesignTokenProperties<'boxShadow', Output>;
};

export type AccordionTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'backgroundColor', Output> & {
    item?: AccordionItemTokens<Output> & {
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
      };
    };
  };

export const accordion: Required<AccordionTokens<'default'>> = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  item: {
    borderColor: { value: '{colors.border.secondary.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    _focus: {
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
    trigger: {
      alignItems: { value: 'center' },
      color: { value: '{colors.font.secondary.value}' },
      backgroundColor: { value: '{colors.background.primary.value}' },
      justifyContent: { value: 'space-between' },
      paddingBlock: { value: '{space.medium.value}' },
      paddingInline: { value: '{space.medium.value}' },
      _hover: {
        color: { value: '{colors.font.secondary.value}' },
        backgroundColor: { value: '{colors.overlay.10.value}' },
      },
    },
    content: {
      color: { value: '{colors.font.secondary.value}' },
      paddingInline: { value: '{space.medium.value}' },
      paddingBlockEnd: { value: '{space.medium.value}' },
      paddingBlockStart: { value: '{space.xs.value}' },
    },
    icon: {
      transitionDuration: { value: '{time.medium.value}' },
      transitionTimingFunction: { value: 'cubic-bezier(0.87, 0, 0.13, 1)' },
    },
  },
};
