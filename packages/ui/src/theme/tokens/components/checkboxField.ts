import {
  AlignContentValue,
  AlignItemsValue,
  DesignToken,
  FlexDirectionValue,
  JustifyContentValue,
} from '../types/designToken';

export interface CheckboxFieldTokens {
  alignItems: DesignToken<AlignItemsValue>;
  alignContent: DesignToken<AlignContentValue>;
  flexDirection: DesignToken<FlexDirectionValue>;
  justifyContent: DesignToken<JustifyContentValue>;
}

export const checkboxfield: CheckboxFieldTokens = {
  alignItems: { value: 'flex-start' },
  alignContent: { value: 'center' },
  flexDirection: { value: 'column' },
  justifyContent: { value: 'center' },
};
