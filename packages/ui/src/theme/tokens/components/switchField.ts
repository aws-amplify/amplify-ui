import {
  BackgroundColorValue,
  BorderColorValue,
  BorderRadiusValue,
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
  shadow: DesignToken<ShadowValue>;
}

interface SwitchFieldSizeTokens {
  fontSize: DesignToken<FontSizeValue>;
}

interface SwitchFieldLabelTokens {
  padding: DesignToken<SpaceValue>;
}

interface SwitchFieldThumbTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderColor: DesignToken<BorderColorValue>;
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
  _disabled: SwitchFieldDisabledTokens;
  _focused: SwitchFieldFocusedTokens;
  large: SwitchFieldSizeTokens;
  small: SwitchFieldSizeTokens;
  label: SwitchFieldLabelTokens;
  thumb: SwitchFieldThumbTokens;
  track: SwitchFieldTrackTokens;
}

export const switchfield: SwitchFieldTokens = {
  // States
  _disabled: {
    opacity: { value: '{opacities.60.value}' },
  },
  _focused: {
    shadow: {
      value: {
        offsetX: '0px',
        offsetY: '0px',
        blurRadius: '0px',
        spreadRadius: '2px',
        color: '{colors.border.focus.value}',
      },
    },
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
