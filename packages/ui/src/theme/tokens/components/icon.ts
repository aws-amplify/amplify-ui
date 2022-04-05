import { DesignToken, LineHeightValue, SpaceValue } from '../types/designToken';

export interface IconTokens {
  lineHeight: DesignToken<LineHeightValue>;
  height: DesignToken<SpaceValue>;
}

export const icon: IconTokens = {
  lineHeight: { value: 1 },
  height: { value: '1em' }, // Should match height of parent container font-size
};
