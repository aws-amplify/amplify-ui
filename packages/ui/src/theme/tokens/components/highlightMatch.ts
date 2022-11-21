import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type HighlightMatchTokens<OutputType extends OutputVariantKey> = {
  highlighted?: DesignTokenProperties<'fontWeight', OutputType>;
};

export const highlightmatch: Required<HighlightMatchTokens<'default'>> = {
  highlighted: {
    fontWeight: { value: '{fontWeights.bold}' },
  },
};
