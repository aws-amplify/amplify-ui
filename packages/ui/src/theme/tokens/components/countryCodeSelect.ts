import { DesignToken, SpaceValue } from '../types/designToken';
export interface CountryCodeSelectTokens {
  height: DesignToken<SpaceValue>;
}
export const countrycodeselect: CountryCodeSelectTokens = {
  height: {
    value: '{space.relative.full.value}',
  },
};
