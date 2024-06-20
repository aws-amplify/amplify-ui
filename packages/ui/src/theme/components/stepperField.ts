import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export type StepperFieldTheme<Required extends boolean = false> =
  BaseProperties &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        button?: BaseProperties & Modifiers<'increase' | 'decrease', Required>;
        input?: BaseProperties;
      },
      Required
    >;
