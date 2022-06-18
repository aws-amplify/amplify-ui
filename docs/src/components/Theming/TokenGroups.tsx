import { TokenList } from './TokenList';

// Utility components since MDX doesn't support typechecking :(

// Colors, Semantic
export const TokensColorsFont = () => (
  <TokenList namespace="colors" childNamespace={['font']} />
);
export const TokensColorsBackground = () => (
  <TokenList namespace="colors" childNamespace={['background']} />
);
export const TokensColorsBorder = () => (
  <TokenList namespace="colors" childNamespace={['border']} />
);
export const TokensColorsShadow = () => (
  <TokenList namespace="colors" childNamespace={['shadow']} />
);
export const TokensColorsOverlay = () => (
  <TokenList namespace="colors" childNamespace={['overlay']} />
);

// Colors, Brand
export const TokensColorsBrandPrimary = () => (
  <TokenList namespace="colors" childNamespace={['brand', 'primary']} />
);
export const TokensColorsBrandSecondary = () => (
  <TokenList namespace="colors" childNamespace={['brand', 'secondary']} />
);

// Colors, Palette
export const TokensColorsNeutral = () => (
  <TokenList namespace="colors" childNamespace={['neutral']} />
);
export const TokensColorsRed = () => (
  <TokenList namespace="colors" childNamespace={['red']} />
);
export const TokensColorsOrange = () => (
  <TokenList namespace="colors" childNamespace={['orange']} />
);
export const TokensColorsYellow = () => (
  <TokenList namespace="colors" childNamespace={['yellow']} />
);
export const TokensColorsGreen = () => (
  <TokenList namespace="colors" childNamespace={['green']} />
);
export const TokensColorsTeal = () => (
  <TokenList namespace="colors" childNamespace={['teal']} />
);
export const TokensColorsBlue = () => (
  <TokenList namespace="colors" childNamespace={['blue']} />
);
export const TokensColorsPurple = () => (
  <TokenList namespace="colors" childNamespace={['purple']} />
);
export const TokensColorsPink = () => (
  <TokenList namespace="colors" childNamespace={['pink']} />
);
export const TokensColorsBlack = () => (
  <TokenList namespace="colors" childNamespace={['black']} />
);
export const TokensColorsWhite = () => (
  <TokenList namespace="colors" childNamespace={['white']} />
);
export const TokensColorsTransparent = () => (
  <TokenList namespace="colors" childNamespace={['transparent']} />
);

// Size
export const TokensSizeSpace = () => <TokenList namespace="space" />;
export const TokensSizeBorderWidths = () => (
  <TokenList namespace="borderWidths" />
);
export const TokensSizeRadii = () => <TokenList namespace="radii" />;

// Typography
export const TokensTypographyFontWeights = () => (
  <TokenList namespace="fontWeights" />
);
export const TokensTypographyFontSizes = () => (
  <TokenList namespace="fontSizes" />
);
export const TokensTypographyLineHeights = () => (
  <TokenList namespace="lineHeights" />
);
export const TokensTypographyFonts = () => <TokenList namespace="fonts" />;
