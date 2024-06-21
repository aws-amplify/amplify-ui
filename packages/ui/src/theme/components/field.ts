import { Modifiers, BaseProperties, Size, Elements } from './utils';

export type FieldTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<Size, Required> &
  Elements<
    {
      description?: BaseProperties;
      'error-message'?: BaseProperties;
    },
    Required
  >;
