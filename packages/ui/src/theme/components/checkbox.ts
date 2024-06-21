import { Modifiers, BaseProperties, ColorTheme, Elements } from './utils';

export type CheckboxTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<ColorTheme | 'disabled', Required> &
  Elements<
    {
      button?: BaseProperties & Modifiers<'focused' | 'error' | 'disabled'>;
      icon?: BaseProperties &
        Modifiers<'checked' | 'indeterminate' | 'disabled'>;
      label?: BaseProperties;
      input?: BaseProperties;
    },
    Required
  >;
