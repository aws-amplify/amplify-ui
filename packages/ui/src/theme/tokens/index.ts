import type { BorderWidths } from './borderWidths';
import { borderWidths } from './borderWidths';
import type { Colors } from './colors';
import { colors } from './colors';
import type {
  ComponentTokens,
  DefaultComponentTokens,
  WebComponentTokens,
} from './components';
import { components } from './components';
import type { Fonts } from './fonts';
import { fonts } from './fonts';
import type { FontSizes } from './fontSizes';
import { fontSizes } from './fontSizes';
import type { FontWeights } from './fontWeights';
import { fontWeights } from './fontWeights';
import type { LineHeights } from './lineHeights';
import { lineHeights } from './lineHeights';
import type { Opacities } from './opacities';
import { opacities } from './opacities';
import type { OutlineOffsets } from './outlineOffsets';
import { outlineOffsets } from './outlineOffsets';
import type { OutlineWidths } from './outlineWidths';
import { outlineWidths } from './outlineWidths';
import type { Radii } from './radii';
import { radii } from './radii';
import type { Shadows } from './shadows';
import { shadows } from './shadows';
import type { Space } from './space';
import { space } from './space';
import type { Time } from './time';
import { time } from './time';
import type { Transforms } from './transforms';
import { transforms } from './transforms';
import type { OutputVariantKey } from './types/designToken';

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
