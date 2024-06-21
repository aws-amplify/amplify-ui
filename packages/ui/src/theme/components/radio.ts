import { BaseProperties, Elements, Modifiers, Size } from './utils';

export type RadioTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | 'disabled', Required> &
  Elements<
    {
      input?: BaseProperties;
      button?: BaseProperties & Modifiers<Size>;
      label?: BaseProperties & Modifiers<'disabled'>;
    },
    Required
  >;
