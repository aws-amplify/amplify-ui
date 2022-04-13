import {
  AlignContentValue,
  AlignItemsValue,
  DesignToken,
  JustifyContentValue,
} from '../types/designToken';

export interface ToggleButtonGroupTokens {
  alignItems: DesignToken<AlignItemsValue>;
  alignContent: DesignToken<AlignContentValue>;
  justifyContent: DesignToken<JustifyContentValue>;
}

export const togglebuttongroup: ToggleButtonGroupTokens = {
  alignItems: { value: 'center' },
  alignContent: { value: 'center' },
  justifyContent: { value: 'flex-start' },
};
