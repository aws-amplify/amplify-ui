export interface LinkTokens {
  active: any;
  color: any;
  focus: any;
  hover: any;
  large: any;
  small: any;
  visited: any;
}
export const link: LinkTokens = {
  active: {
    color: { value: '{colors.font.active.value}' },
  },
  color: { value: '{colors.font.interactive.value}' },
  focus: {
    color: { value: '{colors.font.focus.value}' },
  },
  hover: {
    color: { value: '{colors.font.hover.value}' },
  },
  large: {
    fontSize: { value: '{fontSizes.large.value}' },
  },
  small: {
    fontSize: { value: '{fontSizes.small.value}' },
  },
  visited: {
    color: { value: '{colors.font.interactive.value}' },
  },
};
