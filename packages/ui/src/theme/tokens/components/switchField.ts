import {
  BackgroundColorValue,
  BorderRadiusValue,
  BoxShadowValue,
  ColorValue,
  DesignToken,
  FontSizeValue,
  OpacityValue,
  ShadowValue,
  SpaceValue,
  TransformValue,
  TransitionDurationValue,
} from '../types/designToken';

interface SwitchFieldDisabledTokens {
  opacity: DesignToken<OpacityValue>;
}

interface SwitchFieldFocusedTokens {
  shadow: DesignToken<BoxShadowValue>;
}

interface SwitchFieldSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
}

interface SwitchFieldLabelTokens {
  padding: DesignToken<SpaceValue>;
}

interface SwitchFieldThumbTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<ColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  checked: SwitchFieldThumbCheckedTokens;
  transition: SwitchFieldThumbTransitionTokens;
  width: DesignToken<SpaceValue>;
}

interface SwitchFieldThumbTransitionTokens {
  duration: DesignToken<TransitionDurationValue>;
}

interface SwitchFieldThumbCheckedTokens {
  transform: DesignToken<TransformValue>;
}
interface SwitchFieldTrackTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  checked: SwitchFieldTrackCheckedTokens;
  height: DesignToken<SpaceValue>;
  padding: DesignToken<SpaceValue>;
  transition: SwitchFieldTrackTransitionTokens;
  width: DesignToken<SpaceValue>;
}

interface SwitchFieldTrackTransitionTokens {
  duration: DesignToken<TransitionDurationValue>;
}

interface SwitchFieldTrackCheckedTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export interface SwitchFieldTokens {
  disabled: SwitchFieldDisabledTokens;
  focused: SwitchFieldFocusedTokens;
  large: SwitchFieldSizeTokens;
  small: SwitchFieldSizeTokens;
  label: SwitchFieldLabelTokens;
  thumb: SwitchFieldThumbTokens;
  track: SwitchFieldTrackTokens;
}

export const switchfield: SwitchFieldTokens = {
  // States
  disabled: {
    opacity: { value: '{opacities.60.value}' },
  },
  focused: {
    shadow: { value: '{shadows.small.value}' },
  },

  // Sizes
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
  },
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
  },

  // Child elements
  label: {
    padding: { value: '{space.xs.value}' },
  },

  thumb: {
    backgroundColor: { value: '{colors.background.primary.value}' },
    borderColor: { value: '{colors.border.tertiary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
    checked: {
      transform: { value: '{transforms.slideX.medium.value}' },
    },
    transition: {
      duration: { value: '{time.medium.value}' },
    },
    width: { value: '{space.relative.medium.value}' },
  },

  track: {
    backgroundColor: { value: '{colors.background.tertiary.value}' },
    borderRadius: { value: '{radii.xxxl.value}' },
    checked: {
      backgroundColor: { value: '{colors.brand.primary.60.value}' },
    },
    height: { value: '{space.relative.medium.value}' },
    padding: { value: '{outlineWidths.medium.value}' },
    transition: {
      duration: { value: '{time.short.value}' },
    },
    width: { value: '{space.relative.xl.value}' },
  },
};
