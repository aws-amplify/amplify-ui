import { borderWidths, BorderWidths, WebBorderWidths } from './borderWidths';
import { colors, Colors, WebColors, ReactNativeColors } from './colors';
import { ComponentTokens, components } from './components';
import { fonts, Fonts, WebFonts } from './fonts';
import {
  fontSizes,
  FontSizes,
  WebFontSizes,
  ReactNativeFontSizes,
} from './fontSizes';
import {
  fontWeights,
  FontWeights,
  WebFontWeights,
  ReactNativeFontWeights,
} from './fontWeights';
import { lineHeights, LineHeights, WebLineHeights } from './lineHeights';
import {
  opacities,
  Opacities,
  WebOpacities,
  ReactNativeOpacities,
} from './opacities';
import {
  outlineOffsets,
  OutlineOffsets,
  WebOutlineOffsets,
} from './outlineOffsets';
import {
  outlineWidths,
  OutlineWidths,
  WebOutlineWidths,
} from './outlineWidths';
import { radii, Radii, WebRadii, ReactNativeRadii } from './radii';
import { shadows, Shadows, WebShadows } from './shadows';
import { space, Space, WebSpace, ReactNativeSpace } from './space';
import { time, Time, WebTime, ReactNativeTime } from './time';
import { transforms, Transforms, WebTransforms } from './transforms';

/**
 * Used for custom themes
 */
export interface Tokens {
  components: ComponentTokens;
  borderWidths: BorderWidths;
  colors: Colors;
  fonts: Fonts;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  lineHeights: LineHeights;
  opacities: Opacities;
  outlineOffsets: OutlineOffsets;
  outlineWidths: OutlineWidths;
  radii: Radii;
  shadows: Shadows;
  space: Space;
  time: Time;
  transforms: Transforms;
}

/**
 * The fully setup theme tokens. It has the same shape as Tokens
 * but each token has added fields.
 */
export interface WebTokens {
  borderWidths: WebBorderWidths;
  colors: WebColors;
  components: ComponentTokens;
  fonts: WebFonts;
  fontSizes: WebFontSizes;
  fontWeights: WebFontWeights;
  lineHeights: WebLineHeights;
  opacities: WebOpacities;
  outlineOffsets: WebOutlineOffsets;
  outlineWidths: WebOutlineWidths;
  radii: WebRadii;
  shadows: WebShadows;
  space: WebSpace;
  time: WebTime;
  transforms: WebTransforms;
}

export interface ReactNativeTokens {
  colors: ReactNativeColors;
  fontSizes: ReactNativeFontSizes;
  fontWeights: ReactNativeFontWeights;
  opacities: ReactNativeOpacities;
  radii: ReactNativeRadii;
  space: ReactNativeSpace;
  time: ReactNativeTime;
}

export const tokens: Tokens = {
  components,
  borderWidths,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  opacities,
  outlineOffsets,
  outlineWidths,
  radii,
  shadows,
  space,
  time,
  transforms,
};
