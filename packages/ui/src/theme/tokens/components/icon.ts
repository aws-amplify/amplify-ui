export interface IconTokens {
  lineHeight: never;
  height: never;
}
export const icon: IconTokens = {
  lineHeight: { value: 1 },
  height: { value: '1em' }, // Should match height of parent container font-size
};
