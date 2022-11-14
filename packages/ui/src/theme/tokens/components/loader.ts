import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type LoaderSizeTokens<Output> = DesignTokenProperties<
  'fontSize' | 'height' | 'width',
  Output
>;

type LoaderLinearSizeTokens<Output> = DesignTokenProperties<
  'fontSize' | 'strokeWidth',
  Output
>;

type BaseLoaderTokens<Output> = DesignTokenProperties<
  | 'animationDuration'
  | 'fontSize'
  | 'height'
  | 'strokeEmpty'
  | 'strokeFilled'
  | 'strokeLinecap'
  | 'width',
  Output
>;

export type LoaderTokens<Output extends OutputVariantKey> =
  BaseLoaderTokens<Output> & {
    small?: LoaderSizeTokens<Output>;
    large?: LoaderSizeTokens<Output>;
    linear?: Omit<
      BaseLoaderTokens<Output> &
        DesignTokenProperties<'minWidth' | 'strokeWidth', Output> & {
          small?: LoaderLinearSizeTokens<Output>;
          large?: LoaderLinearSizeTokens<Output>;
        },
      Output extends 'default' ? 'height' : never
    >;
    text?: DesignTokenProperties<'fill', Output>;
  };

export const loader: Required<LoaderTokens<'default'>> = {
  width: { value: '{fontSizes.medium.value}' },
  height: { value: '{fontSizes.medium.value}' },
  fontSize: { value: '{fontSizes.xs.value}' },
  strokeEmpty: { value: '{colors.neutral.20.value}' },
  strokeFilled: { value: '{colors.brand.primary.80.value}' },
  strokeLinecap: { value: 'round' },
  animationDuration: { value: '1s' },
  small: {
    width: { value: '{fontSizes.small.value}' },
    height: { value: '{fontSizes.small.value}' },
    fontSize: { value: '{fontSizes.xxs.value}' },
  },
  large: {
    width: { value: '{fontSizes.large.value}' },
    height: { value: '{fontSizes.large.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
  },
  linear: {
    width: { value: '100%' },
    minWidth: { value: '5rem' },
    fontSize: { value: '{fontSizes.medium.value}' },
    strokeWidth: { value: '{fontSizes.medium.value}' },
    strokeFilled: { value: '{colors.brand.primary.80.value}' },
    strokeEmpty: { value: '{colors.neutral.20.value}' },
    strokeLinecap: { value: 'round' },
    animationDuration: { value: '1s' },
    small: {
      strokeWidth: { value: '{fontSizes.small.value}' },
      fontSize: { value: '{fontSizes.small.value}' },
    },
    large: {
      strokeWidth: { value: '{fontSizes.large.value}' },
      fontSize: { value: '{fontSizes.large.value}' },
    },
  },
  text: {
    fill: { value: '{colors.font.primary.value}' },
  },
};
