import { Modifiers, BaseProperties, Elements } from './utils';

export type FieldGroupTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    {
      'inner-start'?: BaseProperties;
      'inner-end'?: BaseProperties;
      'outer-start'?: BaseProperties & Modifiers<'quiet', Required>;
      'outer-end'?: BaseProperties & Modifiers<'quiet', Required>;
      'field-wrapper'?: BaseProperties &
        Modifiers<'horizontal' | 'vertical', Required>;
      control?: BaseProperties;
      icon?: BaseProperties;
      'icon-button'?: BaseProperties;
    },
    Required
  > &
  Modifiers<
    'horizontal' | 'vertical' | 'has-inner-end' | 'has-inner-start',
    Required
  >;
