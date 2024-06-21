import { Modifiers, BaseProperties, Size, Elements } from './utils';

export type FieldsetTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | 'outlined', Required> &
  Elements<
    {
      legent?: BaseProperties & Modifiers<Size, Required>;
    },
    Required
  >;
