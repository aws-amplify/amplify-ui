import { Modifiers, BaseProperties, Elements, ColorTheme, Size } from './utils';

export type SliderFieldTheme<Required extends boolean = false> =
  BaseProperties &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        label?: BaseProperties;
        root?: BaseProperties &
          Modifiers<'disabled' | 'horizontal' | 'vertical' | Size, Required>;
        track?: BaseProperties &
          Modifiers<'horizontal' | 'vertical' | Size, Required>;
        range?: BaseProperties &
          Modifiers<'disabled' | 'horizontal' | 'vertical', Required>;
        thumb?: BaseProperties & Modifiers<'disabled' | Size, Required>;
      },
      Required
    >;
