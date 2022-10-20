import { DesignToken, SpaceValue } from '../types/designToken';
export interface DialCodeSelectTokens {
  height: DesignToken<SpaceValue>;
}
export const dialcodeselect: DialCodeSelectTokens = {
  height: {
    value: '{space.relative.full.value}',
  },
};
