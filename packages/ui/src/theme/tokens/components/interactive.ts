import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type StateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
>;

type StateWithShadowTokens<Output> = StateTokens<Output> &
  DesignTokenProperties<'boxShadow', Output>;

type InteractiveToken<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
> & {
  _hover?: StateTokens<Output>;
  _focus?: StateWithShadowTokens<Output>;
  _active?: StateTokens<Output>;
  _disabled?: StateTokens<Output>;
  _loading?: StateTokens<Output>;
};

export type InteractiveRoleTokens<Output> = {
  info: InteractiveToken<Output>;
  success: InteractiveToken<Output>;
  error: InteractiveToken<Output>;
  warning: InteractiveToken<Output>;
};

export type InteractiveTokens<Output> = {
  plain: InteractiveRoleTokens<Output>;
  filled: InteractiveRoleTokens<Output>;
  outline: InteractiveRoleTokens<Output>;
};

export const interactive: Required<InteractiveTokens<'default'>> = {
  plain: {
    info: {},
    success: {},
    error: {},
    warning: {},
  },
  filled: {},
  outline: {},
};
