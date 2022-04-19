import { borderWidths, BorderWidths, WebBorderWidths } from './borderWidths';
import { colors, Colors, WebColors } from './colors';
import { ComponentTokens, components } from './components';
import { fonts, Fonts, WebFonts } from './fonts';
import { fontSizes, FontSizes, WebFontSizes } from './fontSizes';
import { fontWeights, FontWeights, WebFontWeights } from './fontWeights';
import { lineHeights, LineHeights, WebLineHeights } from './lineHeights';
import { opacities, Opacities, WebOpacities } from './opacities';
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
import { radii, Radii, WebRadii } from './radii';
import { shadows, Shadows, WebShadows } from './shadows';
import { space, Space, WebSpace } from './space';
import { time, Time, WebTime } from './time';
import { transforms, Transforms, WebTransforms } from './transforms';

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
export interface WebTokens extends Tokens {
  borderWidths: WebBorderWidths;
  colors: WebColors;
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
  transform: WebTransforms;
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
