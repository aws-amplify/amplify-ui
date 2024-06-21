import { Modifiers, BaseProperties, Elements } from './utils';

export type FieldGroupTheme<Required extends boolean = false> = BaseProperties &
  Modifiers<
    'horizontal' | 'vertical' | 'has-inner-end' | 'has-inner-start',
    Required
  > &
  Elements<
    {
      'inner-start'?: BaseProperties;
      'inner-end'?: BaseProperties;
      'outer-start'?: BaseProperties & Modifiers<'quiet', Required>;
      'outer-end'?: BaseProperties & Modifiers<'quiet', Required>;
      'field-wrapper'?: BaseProperties;
      control?: BaseProperties;
      icon?: BaseProperties;
      icon__button?: BaseProperties;
    },
    Required
  >;
