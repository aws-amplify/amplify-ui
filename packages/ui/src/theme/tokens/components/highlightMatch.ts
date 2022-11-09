import { DesignToken, FontWeightValue } from '../types/designToken';

interface HighlightMatchHighlightedTokens {
  fontWeight: DesignToken<FontWeightValue>;
}

export interface HighlightMatchTokens {
  highlighted: HighlightMatchHighlightedTokens;
}

export const highlightmatch: HighlightMatchTokens = {
  highlighted: {
    fontWeight: { value: '{fontWeights.bold}' },
  },
};
