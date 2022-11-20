import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type CardVariationStyleKey =
  | 'backgroundColor'
  | 'borderRadius'
  | 'borderWidth'
  | 'borderStyle'
  | 'borderColor'
  | 'boxShadow';

type CardVariationTokens<OutputType> = DesignTokenProperties<
  CardVariationStyleKey,
  OutputType
>;

export type CardTokens<OutputType extends OutputVariantKey> =
  CardVariationTokens<OutputType> &
    DesignTokenProperties<'padding', OutputType> & {
      elevated?: CardVariationTokens<OutputType>;
      outlined?: CardVariationTokens<OutputType>;
    };

export const card: Required<CardTokens<'default'>> = {
  backgroundColor: { value: '{colors.background.primary.value}' },
  borderRadius: { value: '{radii.xs.value}' },
  borderWidth: { value: '0' },
  borderStyle: { value: 'solid' },
  borderColor: { value: 'transparent' },
  boxShadow: { value: 'none' },
  padding: { value: '{space.medium.value}' },

  outlined: {
    backgroundColor: { value: '{components.card.backgroundColor.value}' },
    borderRadius: { value: '{radii.xs.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    borderColor: { value: '{colors.border.primary.value}' },
    boxShadow: { value: '{components.card.boxShadow.value}' },
  },

  elevated: {
    backgroundColor: { value: '{components.card.backgroundColor.value}' },
    borderRadius: { value: '{radii.xs.value}' },
    borderWidth: { value: '0' },
    borderStyle: { value: 'solid' },
    borderColor: { value: 'transparent' },
    boxShadow: { value: '{shadows.medium.value}' },
  },
};
