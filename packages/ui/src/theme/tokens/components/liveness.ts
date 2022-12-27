import { DesignToken, ColorValue } from '../types/designToken';

export interface LivenessTokens {
  cameraModule: { backgroundColor: DesignToken<ColorValue> };
}

export const liveness: LivenessTokens = {
  cameraModule: {
    backgroundColor: { value: '{colors.black}' },
  },
};
