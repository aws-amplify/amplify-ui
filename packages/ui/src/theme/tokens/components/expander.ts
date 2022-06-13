import {
  AlignItemsValue,
  AnimationDurationValue,
  AnimationTimingFunctionValue,
  BackgroundColorValue,
  BorderRadiusValue,
  BoxShadowValue,
  ColorValue,
  DesignToken,
  DisplayValue,
  JustifyContentValue,
  RadiusValue,
  SpaceValue,
  TransitionDurationValue,
  TransitionTimingFunctionValue,
} from '../types/designToken';

interface ExpanderItemFocusTokens {
  boxShadow: DesignToken<BoxShadowValue>;
}

interface ExpanderItemTokens {
  marginTop: DesignToken<SpaceValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  borderBottomLeftRadius: DesignToken<RadiusValue>;
  borderBottomRightRadius: DesignToken<RadiusValue>;
  borderTopLeftRadius: DesignToken<RadiusValue>;
  borderTopRightRadius: DesignToken<RadiusValue>;
  borderStartStartRadius: DesignToken<RadiusValue>;
  borderStartEndRadius: DesignToken<RadiusValue>;
  borderEndStartRadius: DesignToken<RadiusValue>;
  borderEndEndRadius: DesignToken<RadiusValue>;
  _focus: ExpanderItemFocusTokens;
}

interface ExpanderHeaderTokens {
  boxShadow: DesignToken<BoxShadowValue>;
}

interface ExpanderTriggerTokens {
  minHeight: DesignToken<SpaceValue>;
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
  alignItems: DesignToken<AlignItemsValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  _hover: ExpanderTriggerHoverTokens;
}

interface ExpanderTriggerHoverTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

interface ExpanderContentTokens {
  paddingInlineStart: DesignToken<SpaceValue>;
  paddingInlineEnd: DesignToken<SpaceValue>;
  text: ExpanderContentTextTokens;
  _open: ExpanderContentOpenTokens;
  _closed: ExpanderContentClosedTokens;
}

interface ExpanderContentTextTokens {
  color: DesignToken<ColorValue>;
  paddingBlockStart: DesignToken<SpaceValue>;
  paddingBlockEnd: DesignToken<SpaceValue>;
}

interface ExpanderContentOpenTokens {
  animationDuration: DesignToken<AnimationDurationValue>;
  animationTimingFunction: DesignToken<AnimationTimingFunctionValue>;
}

interface ExpanderContentClosedTokens {
  animationDuration: DesignToken<AnimationDurationValue>;
  animationTimingFunction: DesignToken<AnimationTimingFunctionValue>;
}

interface ExpanderIconTokens {
  transitionDuration: DesignToken<TransitionDurationValue>;
  transitionTimingFunction: DesignToken<TransitionTimingFunctionValue>;
}

export interface ExpanderTokens {
  display: DesignToken<DisplayValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  width: DesignToken<SpaceValue>;
  item: ExpanderItemTokens;
  header: ExpanderHeaderTokens;
  trigger: ExpanderTriggerTokens;
  content: ExpanderContentTokens;
  icon: ExpanderIconTokens;
}

export const expander: ExpanderTokens = {
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
