import {
  AlignContentValue,
  AlignItemsValue,
  DesignToken,
  FlexWrapValue,
  GapValue,
  JustifyContentValue,
} from '../types/designToken';

export interface FlexTokens {
  gap: DesignToken<GapValue>;
  justifyContent: DesignToken<JustifyContentValue>;
  alignItems: DesignToken<AlignItemsValue>;
  alignContent: DesignToken<AlignContentValue>;
  flexWrap: DesignToken<FlexWrapValue>;
}

export const flex: FlexTokens = {
  gap: { value: '{space.medium.value}' },
  justifyContent: { value: 'normal' },
  alignItems: { value: 'stretch' },
  alignContent: { value: 'normal' },
  flexWrap: { value: 'nowrap' },
};
