import { Modifiers, BaseProperties, Elements, Size } from './utils';

export type SwitchTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    {
      wrapper?: BaseProperties &
        Modifiers<'start' | 'end' | 'top' | 'bottom', Required>;
      track?: BaseProperties &
        Modifiers<'checked' | 'disabled' | 'focused' | 'error'>;
      thumb?: BaseProperties & Modifiers<'checked' | 'disabled'>;
      label?: BaseProperties;
    },
    Required
  >;

export type SwitchFieldTheme<Required extends boolean = false> =
  BaseProperties & Modifiers<Size, Required>;
