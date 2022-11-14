import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type StateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
>;

type SearchTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'color'
> & {
  _active?: StateTokens<Output>;
  _disabled?: StateTokens<Output>;
  _focus?: StateTokens<Output>;
  _hover?: StateTokens<Output>;
};

export type SearchFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'color', Output> & {
    button?: SearchTokens<Output>;
  };

export const searchfield: Required<SearchFieldTokens<'default'>> = {
  color: { value: '{components.fieldcontrol.color.value}' },
  button: {
    color: { value: '{components.button.color.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    _active: {
      backgroundColor: {
        value: '{components.button._active.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._active.borderColor.value}' },
      color: { value: '{components.button._active.color.value}' },
    },
    _disabled: {
      backgroundColor: {
        value: '{components.button._disabled.backgroundColor.value}',
      },
      borderColor: {
        value: '{components.button._disabled.borderColor.value}',
      },
      color: { value: '{components.button._disabled.color.value}' },
    },
    _focus: {
      backgroundColor: {
        value: '{components.button._focus.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._focus.borderColor.value}' },
      color: { value: '{components.button._focus.color.value}' },
    },
    _hover: {
      backgroundColor: {
        value: '{components.button._hover.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._hover.borderColor.value}' },
      color: { value: '{components.button._hover.color.value}' },
    },
  },
};
