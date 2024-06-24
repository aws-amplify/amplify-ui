import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export type StepperFieldTheme<Required extends boolean = false> =
  BaseProperties &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        // Note: this is invalid BEM
        'button--increase'?: BaseProperties &
          Modifiers<'quiet' | 'disabled', Required>;
        'button--decrease'?: BaseProperties &
          Modifiers<'quiet' | 'disabled', Required>;
        input?: BaseProperties;
      },
      Required
    >;
