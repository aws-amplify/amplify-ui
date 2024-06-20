import { Modifiers, BaseProperties, Elements, Size } from './utils';

export type SwitchFieldTheme<Required extends boolean = false> =
  BaseProperties &
    Modifiers<Size, Required> &
    Elements<
      {
        wrapper?: BaseProperties;
        track?: BaseProperties &
          Modifiers<'checked' | 'disabled' | 'focused' | 'error'>;
        thumb?: BaseProperties & Modifiers<'checked' | 'disabled'>;
        label?: BaseProperties;
      },
      Required
    >;
