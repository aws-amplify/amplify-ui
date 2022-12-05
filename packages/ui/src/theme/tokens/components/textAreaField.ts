import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type TokenKey = 'color' | 'borderColor' | 'fontSize';

export type TextAreaFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<
    Output extends 'default' ? Exclude<TokenKey, 'fontSize'> : TokenKey,
    Output
  > & {
    _focus?: DesignTokenProperties<'borderColor', Output>;
  };

export const textareafield: Required<TextAreaFieldTokens<'default'>> = {
  color: { value: '{components.fieldcontrol.color.value}' },
  borderColor: { value: '{components.fieldcontrol.borderColor.value}' },
  _focus: {
    borderColor: {
      value: '{components.fieldcontrol._focus.borderColor.value}',
    },
  },
};
