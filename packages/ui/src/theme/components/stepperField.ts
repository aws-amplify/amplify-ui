import { Modifiers, ComponentStyles, Elements, ColorTheme } from './utils';

export type StepperFieldTheme<Required extends boolean = false> =
  ComponentStyles &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        // Note: this is invalid BEM because
        // in our CSS we use 'amplify-stepperfield__button--increase--quiet
        // there should only be 1 modifier in a classname
        'button--increase'?: ComponentStyles &
          Modifiers<'quiet' | 'disabled', Required>;
        'button--decrease'?: ComponentStyles &
          Modifiers<'quiet' | 'disabled', Required>;
        input?: ComponentStyles;
      },
      Required
    >;
