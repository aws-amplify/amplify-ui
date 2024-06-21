import { Modifiers, BaseProperties, Size, Elements } from './utils';

export type FieldsetTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | 'outlined' | 'plain', Required> &
  Elements<
    {
      legend?: BaseProperties & Modifiers<Size, Required>;
    },
    Required
  >;
