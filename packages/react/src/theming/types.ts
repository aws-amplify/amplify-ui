export type Theme = {
  [key: string]: Theme | string;
};

export type ThemeOptions = {
  cssPrefix?: string;
};

export type ThemeContextType = {
  theme?: Theme;
  options?: ThemeOptions;
};
