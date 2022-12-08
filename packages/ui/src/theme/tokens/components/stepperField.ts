import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type ButtonStateColorTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'color',
  Output
>;

export type StepperFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'borderColor' | 'flexDirection', Output> & {
    input?: DesignTokenProperties<'textAlign' | 'color' | 'fontSize', Output>;
    button?: DesignTokenProperties<'backgroundColor' | 'color', Output> & {
      _active?: ButtonStateColorTokens<Output>;
      _focus?: ButtonStateColorTokens<Output>;
      _disabled?: ButtonStateColorTokens<Output>;
      _hover?: ButtonStateColorTokens<Output>;
    };
  };

export const stepperfield: Required<StepperFieldTokens<'default'>> = {
  borderColor: { value: '{components.fieldcontrol.borderColor}' },
  flexDirection: { value: 'column' },
  input: {
    color: { value: '{components.fieldcontrol.color}' },
    fontSize: { value: '{components.fieldcontrol.fontSize}' },
    textAlign: { value: 'center' },
  },
  button: {
    color: { value: '{components.button.color}' },
    backgroundColor: { value: '{colors.transparent}' },
    _active: {
      color: { value: '{components.button._active.color}' },
      backgroundColor: { value: '{components.button._active.backgroundColor}' },
    },
    _focus: {
      color: { value: '{components.button._focus.color}' },
      backgroundColor: { value: '{components.button._focus.backgroundColor}' },
    },
    _disabled: {
      color: { value: '{components.button._disabled.color}' },
      backgroundColor: {
        value: '{components.fieldcontrol._disabled.backgroundColor}',
      },
    },
    _hover: {
      color: { value: '{components.button._hover.color}' },
      backgroundColor: { value: '{components.button._hover.backgroundColor}' },
    },
  },
};
