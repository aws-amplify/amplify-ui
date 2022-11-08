import { borderWidths, BorderWidths } from './borderWidths';
import { colors, Colors, ReactNativeColors } from './colors';
import { ComponentTokens, components } from './components';
import { fonts, Fonts } from './fonts';
import { fontSizes, FontSizes, ReactNativeFontSizes } from './fontSizes';
import {
  fontWeights,
  FontWeights,
  ReactNativeFontWeights,
} from './fontWeights';
import { lineHeights, LineHeights } from './lineHeights';
import { opacities, Opacities, ReactNativeOpacities } from './opacities';
import { outlineOffsets, OutlineOffsets } from './outlineOffsets';
import { outlineWidths, OutlineWidths } from './outlineWidths';
import { radii, Radii, ReactNativeRadii } from './radii';
import { shadows, Shadows } from './shadows';
import { space, Space, ReactNativeSpace } from './space';
import { time, Time, ReactNativeTime } from './time';
import { transforms, Transforms } from './transforms';

/**
 * Used for custom themes
 */
export interface Tokens<Output = unknown> {
  components: ComponentTokens;
  borderWidths: BorderWidths<Output>;
  colors: Colors<Output>;
  fonts: Fonts<Output>;
  fontSizes: FontSizes<Output>;
  fontWeights: FontWeights<Output>;
  lineHeights: LineHeights<Output>;
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
export type WebTokens = {
  [Key in keyof Tokens]: Required<Tokens<'strict'>[Key]>;
};

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
