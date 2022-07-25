import { BackgroundColorValue, DesignToken } from '../../types/designToken';

export interface BackdropTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export const backdrop: BackdropTokens = {
  backgroundColor: { value: '{colors.overlay.50.value}' },
};
