import { DesignToken, FlexDirectionValue } from '../types/designToken';

export interface SelectFieldToken {
  flexDirection: DesignToken<FlexDirectionValue>;
}

export const selectfield: SelectFieldToken = {
  flexDirection: {
    value: 'column',
  },
};
