import {
  Modifiers,
  BaseProperties,
  Elements,
  Size,
  FieldControlModifiers,
} from './utils';

export type SelectTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<FieldControlModifiers | 'expanded', Required> &
  Elements<
    {
      wrapper?: BaseProperties;
      icon?: BaseProperties & Modifiers<Size, Required>;
    },
    Required
  >;
