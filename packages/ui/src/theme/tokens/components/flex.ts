export interface FlexTokens {
  gap: any;
  justifyContent: any;
  alignItems: any;
  alignContent: any;
  flexWrap: any;
}
export const flex: FlexTokens = {
  gap: { value: '{space.medium.value}' },
  justifyContent: { value: 'normal' },
  alignItems: { value: 'stretch' },
  alignContent: { value: 'normal' },
  flexWrap: { value: 'nowrap' },
};
