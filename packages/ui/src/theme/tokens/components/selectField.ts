import { DesignToken, FlexDirectionValue } from '../types/designToken';

export interface SelectFieldTokens {
  flexDirection: DesignToken<FlexDirectionValue>;
}

export const selectfield: SelectFieldTokens = {
  flexDirection: {
    value: 'column',
  },
};
