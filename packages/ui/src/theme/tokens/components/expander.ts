import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type ExpanderItemTokens<Output> = DesignTokenProperties<
  | 'marginTop'
  | 'boxShadow'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderStartStartRadius'
  | 'borderStartEndRadius'
  | 'borderEndStartRadius'
  | 'borderEndEndRadius',
  Output
> & {
  _focus?: DesignTokenProperties<'boxShadow', Output>;
};

type ExpanderTriggerTokens<Output> = DesignTokenProperties<
  | 'minHeight'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'alignItems'
  | 'justifyContent',
  Output
> & {
  _hover?: DesignTokenProperties<'backgroundColor', Output>;
};

type ExpanderContentStateTokens<Output> = DesignTokenProperties<
  'animationDuration' | 'animationTimingFunction',
  Output
>;

type ExpanderContentTokens<Output> = DesignTokenProperties<
  'paddingInlineStart' | 'paddingInlineEnd',
  Output
> & {
  text?: DesignTokenProperties<
    'color' | 'paddingBlockStart' | 'paddingBlockEnd',
    Output
  >;
  _open?: ExpanderContentStateTokens<Output>;
  _closed?: ExpanderContentStateTokens<Output>;
};

export type ExpanderTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    'display' | 'backgroundColor' | 'borderRadius' | 'boxShadow' | 'width',
    Output
  > & {
    content?: ExpanderContentTokens<Output>;
    header?: DesignTokenProperties<'boxShadow', Output>;
    item?: ExpanderItemTokens<Output>;
    trigger?: ExpanderTriggerTokens<Output>;
    icon?: DesignTokenProperties<
      'transitionDuration' | 'transitionTimingFunction',
      Output
    >;
  };

export const expander: Required<ExpanderTokens<'default'>> = {
  display: { value: 'block' },
  backgroundColor: { value: '{colors.background.primary.value}' },
  borderRadius: { value: '{radii.medium.value}' },
  boxShadow: {
    value: '{shadows.large.value}',
  },
  width: { value: '100%' },
  item: {
    marginTop: { value: '1px' },
    boxShadow: {
      value: '{shadows.small.value}',
    },
    borderBottomLeftRadius: { value: '{radii.medium.value}' },
    borderBottomRightRadius: { value: '{radii.medium.value}' },
    borderTopLeftRadius: { value: '{radii.medium.value}' },
    borderTopRightRadius: { value: '{radii.medium.value}' },
    borderStartStartRadius: { value: '{radii.medium.value}' },
    borderStartEndRadius: { value: '{radii.medium.value}' },
    borderEndStartRadius: { value: '{radii.medium.value}' },
    borderEndEndRadius: { value: '{radii.medium.value}' },
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
  },
  header: {
    boxShadow: {
      value: {
        offsetX: '0',
        offsetY: '1px',
        blurRadius: '0',
        color: '{colors.overlay.20.value}',
      },
    },
  },
  trigger: {
    minHeight: { value: '3rem' },
    paddingInlineStart: { value: '{space.large.value}' },
    paddingInlineEnd: { value: '{space.large.value}' },
    alignItems: { value: 'center' },
    justifyContent: { value: 'space-between' },
    _hover: {
      backgroundColor: { value: '{colors.overlay.10.value}' },
    },
  },
  content: {
    paddingInlineStart: { value: '{space.large.value}' },
    paddingInlineEnd: { value: '{space.large.value}' },
    text: {
      color: { value: '{colors.font.secondary.value}' },
      paddingBlockStart: { value: '{space.medium.value}' },
      paddingBlockEnd: { value: '{space.medium.value}' },
    },
    _open: {
      animationDuration: { value: '{time.medium.value}' },
      animationTimingFunction: { value: 'cubic-bezier(0.87, 0, 0.13, 1)' },
    },
    _closed: {
      animationDuration: { value: '{time.medium.value}' },
      animationTimingFunction: { value: 'cubic-bezier(0.87, 0, 0.13, 1)' },
    },
  },
  icon: {
    transitionDuration: { value: '{time.medium.value}' },
    transitionTimingFunction: { value: 'cubic-bezier(0.87, 0, 0.13, 1)' },
  },
};
