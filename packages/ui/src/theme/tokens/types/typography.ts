import { DesignTokenProperties } from './designToken';

export type TypographyTokens<OutputType> = DesignTokenProperties<
  'fontSize' | 'fontWeight' | 'color',
  OutputType
>;
