import { Modifiers, BaseProperties, Elements, Size } from './utils';

export type SelectTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size | 'expanded', Required> &
  Elements<
    {
      wrapper?: BaseProperties;
      icon?: BaseProperties & Modifiers<Size, Required>;
    },
    Required
  >;
