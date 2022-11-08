import { DesignTokenProperties } from '../types/designToken';

type LinkState = 'active' | 'focus' | 'hover' | 'visited';

export type LinkTokens<Output = unknown> = DesignTokenProperties<'color'> &
  Record<LinkState, DesignTokenProperties<'color', Output>>;

export const link: LinkTokens = {
  active: { color: { value: '{colors.font.active.value}' } },
  color: { value: '{colors.font.interactive.value}' },
  focus: { color: { value: '{colors.font.focus.value}' } },
  hover: { color: { value: '{colors.font.hover.value}' } },
  visited: { color: { value: '{colors.font.interactive.value}' } },
};
