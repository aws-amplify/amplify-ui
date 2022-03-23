export interface FlexTokens {
  gap: never;
  justifyContent: never;
  alignItems: never;
  alignContent: never;
  flexWrap: never;
}
export const flex: FlexTokens = {
  gap: { value: '{space.medium.value}' },
  justifyContent: { value: 'normal' },
  alignItems: { value: 'stretch' },
  alignContent: { value: 'normal' },
  flexWrap: { value: 'nowrap' },
};
