import { Modifiers, ComponentStyles, Elements } from './utils';

export type FieldGroupTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        'inner-start'?: ComponentStyles;
        'inner-end'?: ComponentStyles;
        'outer-start'?: ComponentStyles & Modifiers<'quiet', Required>;
        'outer-end'?: ComponentStyles & Modifiers<'quiet', Required>;
        'field-wrapper'?: ComponentStyles &
          Modifiers<'horizontal' | 'vertical', Required>;
        control?: ComponentStyles;
        icon?: ComponentStyles;
        'icon-button'?: ComponentStyles;
      },
      Required
    > &
    Modifiers<
      'horizontal' | 'vertical' | 'has-inner-end' | 'has-inner-start',
      Required
    >;
