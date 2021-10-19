import { DesignToken } from './designToken';

export interface OrdinalScale {
  primary: DesignToken;
  secondary: DesignToken;
  tertiary: DesignToken;
}

export interface OrdinalVariation {
  info: DesignToken;
  warning: DesignToken;
  error: DesignToken;
  success: DesignToken;
}
