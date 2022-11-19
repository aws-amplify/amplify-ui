import { borderWidths, BorderWidths } from './borderWidths';
import { colors, Colors } from './colors';
import {
  components,
  ComponentTokens,
  DefaultComponentTokens,
  WebComponentTokens,
} from './components';
import { fonts, Fonts } from './fonts';
import { fontSizes, FontSizes } from './fontSizes';
import { fontWeights, FontWeights } from './fontWeights';
import { lineHeights, LineHeights } from './lineHeights';
import { opacities, Opacities } from './opacities';
import { outlineOffsets, OutlineOffsets } from './outlineOffsets';
import { outlineWidths, OutlineWidths } from './outlineWidths';
import { radii, Radii } from './radii';
import { shadows, Shadows } from './shadows';
import { space, Space } from './space';
import { time, Time } from './time';
import { transforms, Transforms } from './transforms';
import { OutputVariantKey } from './types/designToken';

/**
 * Used for custom themes
 */
interface BaseTokens<Output extends OutputVariantKey = unknown> {
  borderWidths?: BorderWidths<Output>;
  colors?: Colors<Output>;
  fonts?: Fonts<Output>;
  fontSizes?: FontSizes<Output>;
  fontWeights?: FontWeights<Output>;
  lineHeights?: LineHeights<Output>;
  opacities?: Opacities<Output>;
  outlineOffsets?: OutlineOffsets<Output>;
  outlineWidths?: OutlineWidths<Output>;
  radii?: Radii<Output>;
  shadows?: Shadows<Output>;
  space?: Space<Output>;
  time?: Time<Output>;
  transforms?: Transforms<Output>;
}

export type Tokens = BaseTokens<'optional'> & { components?: ComponentTokens };

export type DefaultTokens = Required<BaseTokens<'default'>> & {
  components: DefaultComponentTokens;
};

/**
 * The fully setup theme tokens. It has the same shape as Tokens
 * but each token has added fields.
 */
export type WebTokens = Required<BaseTokens<'required'>> & {
  components: WebComponentTokens;
};

type ReactNative = 'react-native';

type BaseReactNativeTokens<Output extends OutputVariantKey = unknown> = {
  colors?: Colors<Output, ReactNative>;
  borderWidths?: BorderWidths<Output, ReactNative>;
  fontSizes?: Omit<FontSizes<Output, ReactNative>, 'xxxs' | 'xxxxl'>;
  fontWeights?: FontWeights<Output, ReactNative>;
  opacities?: Opacities<Output, ReactNative>;
  radii?: Radii<Output, ReactNative>;
  space?: Omit<Space<Output, ReactNative>, 'xxxs' | 'relative' | 'zero'>;
  time?: Time<Output, ReactNative>;
};

export type ReactNativeTokens<Output extends OutputVariantKey> = Output extends
  | 'required'
  | 'default'
  ? Required<BaseReactNativeTokens<Output>>
  : BaseReactNativeTokens<Output>;

export const tokens: DefaultTokens = {
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

export const reactNativeTokens: ReactNativeTokens<'default'> = {
  colors,
  borderWidths,
  fontSizes: {
    xxs: fontSizes.xxs,
    xs: fontSizes.xs,
    small: fontSizes.small,
    medium: fontSizes.medium,
    large: fontSizes.large,
    xl: fontSizes.xl,
    xxl: fontSizes.xxl,
    xxxl: fontSizes.xxxl,
  },
  fontWeights,
  opacities,
  // React Native doesn't need the relative space values
  space: {
    // use `space.xxxs` to output a value of `2` and avoid odd space numbers
    xxs: space.xxxs,
    xs: space.xs,
    small: space.small,
    medium: space.medium,
    large: space.large,
    xl: space.xl,
    xxl: space.xxl,
    xxxl: space.xxxl,
  },
  radii,
  time,
};
