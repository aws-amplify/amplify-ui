import type {
  FontSizes,
  FontWeights,
  LineHeights,
  Radii,
  Shadows,
  SpaceSizes,
} from '@aws-amplify/ui';

/**
 * Token keys for colors
 *
 * Though both 'white' and 'black' are valid CSS values
 * We still want to define them as keys here and convert them into CSS variable reference afterwards
 * This will make the default dark mode override work, where we flip these two
 */
type WhiteKey = 'white';

type BlackKey = 'black';

type RedKeys =
  | 'red.10'
  | 'red.20'
  | 'red.40'
  | 'red.60'
  | 'red.80'
  | 'red.90'
  | 'red.100';

type OrangeKeys =
  | 'orange.10'
  | 'orange.20'
  | 'orange.40'
  | 'orange.60'
  | 'orange.80'
  | 'orange.90'
  | 'orange.100';

type YellowKeys =
  | 'yellow.10'
  | 'yellow.20'
  | 'yellow.40'
  | 'yellow.60'
  | 'yellow.80'
  | 'yellow.90'
  | 'yellow.100';

type GreenKeys =
  | 'green.10'
  | 'green.20'
  | 'green.40'
  | 'green.60'
  | 'green.80'
  | 'green.90'
  | 'green.100';

type TealKeys =
  | 'teal.10'
  | 'teal.20'
  | 'teal.40'
  | 'teal.60'
  | 'teal.80'
  | 'teal.90'
  | 'teal.100';

type BlueKeys =
  | 'blue.10'
  | 'blue.20'
  | 'blue.40'
  | 'blue.60'
  | 'blue.80'
  | 'blue.90'
  | 'blue.100';

type PurpleKeys =
  | 'purple.10'
  | 'purple.20'
  | 'purple.40'
  | 'purple.60'
  | 'purple.80'
  | 'purple.90'
  | 'purple.100';

type PinkKeys =
  | 'pink.10'
  | 'pink.20'
  | 'pink.40'
  | 'pink.60'
  | 'pink.80'
  | 'pink.90'
  | 'pink.100';

type NeutralKeys =
  | 'neutral.10'
  | 'neutral.20'
  | 'neutral.40'
  | 'neutral.60'
  | 'neutral.80'
  | 'neutral.90'
  | 'neutral.100';

type OverlayKeys =
  | 'overlay.10'
  | 'overlay.20'
  | 'overlay.30'
  | 'overlay.40'
  | 'overlay.50'
  | 'overlay.60'
  | 'overlay.70'
  | 'overlay.80'
  | 'overlay.90';

type BrandColorKeys =
  | 'brand.primary.10'
  | 'brand.primary.20'
  | 'brand.primary.40'
  | 'brand.primary.60'
  | 'brand.primary.80'
  | 'brand.primary.90'
  | 'brand.primary.100'
  | 'brand.secondary.10'
  | 'brand.secondary.20'
  | 'brand.secondary.40'
  | 'brand.secondary.60'
  | 'brand.secondary.80'
  | 'brand.secondary.90'
  | 'brand.secondary.100';

type FontColorKeys =
  | 'font.primary'
  | 'font.secondary'
  | 'font.tertiary'
  | 'font.disabled'
  | 'font.inverse'
  | 'font.interactive'
  | 'font.hover'
  | 'font.focus'
  | 'font.active'
  | 'font.success'
  | 'font.info'
  | 'font.warning'
  | 'font.error';

type BackgroundColorKeys =
  | 'background.primary'
  | 'background.secondary'
  | 'background.tertiary'
  | 'background.quaternary'
  | 'background.disabled'
  | 'background.success'
  | 'background.info'
  | 'background.warning'
  | 'background.error';

type BorderColorKeys =
  | 'border.primary'
  | 'border.secondary'
  | 'border.tertiary'
  | 'border.disabled'
  | 'border.focus'
  | 'border.pressed'
  | 'border.error';

type ShadowColorKeys =
  | 'shadow.primary'
  | 'shadow.secondary'
  | 'shadow.tertiary';

export type ColorKeys<PropertyType> =
  | PropertyType
  | WhiteKey
  | BlackKey
  | RedKeys
  | OrangeKeys
  | YellowKeys
  | GreenKeys
  | TealKeys
  | BlueKeys
  | PurpleKeys
  | PinkKeys
  | NeutralKeys
  | OverlayKeys
  | BrandColorKeys
  | FontColorKeys
  | BackgroundColorKeys
  | BorderColorKeys
  | ShadowColorKeys;

export type BoxShadowKeys<PropertyType> = PropertyType | keyof Shadows;

export type FontSizeKeys<PropertyType> = PropertyType | keyof FontSizes;

export type FontWeightKeys<PropertyType> = PropertyType | keyof FontWeights;

export type FontFamilyKeys<PropertyType> =
  | PropertyType
  | 'default.variable'
  | 'default.static';

export type LineHeightKeys<PropertyType> = PropertyType | keyof LineHeights;

// Note: we cannot use keyof Opacities
// because the return type will be number union and no intellisense
export type OpacityKeys<PropertyType> =
  | PropertyType
  | '0'
  | '10'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | '100';

export type RadiiKeys<PropertyType> = PropertyType | keyof Radii;

// Theme keys for space
export type SpaceKeys<PropertyType> =
  | PropertyType
  | keyof SpaceSizes
  | 'zero'
  | 'relative.xxxs'
  | 'relative.xxs'
  | 'relative.xs'
  | 'relative.small'
  | 'relative.medium'
  | 'relative.large'
  | 'relative.xl'
  | 'relative.xxl'
  | 'relative.xxxl'
  | 'relative.full';

export type TransformKeys<PropertyType> =
  | PropertyType
  | 'slideX.small'
  | 'slideX.medium'
  | 'slideX.large';

export const stylePropsToThemeKeys = {
  backgroundColor: 'colors',
  color: 'colors',
  borderRadius: 'radii',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  fontFamily: 'fonts',
  lineHeight: 'lineHeights',
  opacity: 'opacities',
  boxShadow: 'shadows',
  transform: 'transforms',
  left: 'space',
  right: 'space',
  top: 'space',
  bottom: 'space',
  height: 'space',
  width: 'space',
  letterSpacing: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  marginLeft: 'space',
  marginRight: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  maxHeight: 'space',
  maxWidth: 'space',
  minHeight: 'space',
  minWidth: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  paddingLeft: 'space',
  paddingRight: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
};
