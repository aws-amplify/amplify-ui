import { ColorValue, DesignToken, TextContrast } from '../types/designToken';

interface LinkStateTokens extends TextContrast {}

export interface LinkTokens extends TextContrast {
  active: LinkStateTokens;
  focus: LinkStateTokens;
  hover: LinkStateTokens;
  visited: LinkStateTokens;
}

export const link: LinkTokens = {
  active: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.active.value}' },
  },
  backgroundColor: { value: 'transparent' },
  color: { value: '{colors.font.interactive.value}' },
  focus: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.focus.value}' },
  },
  hover: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.hover.value}' },
  },
  visited: {
    backgroundColor: { value: 'transparent' },
    color: { value: '{colors.font.interactive.value}' },
  },
};
