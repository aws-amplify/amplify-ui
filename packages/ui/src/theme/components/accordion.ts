import { BaseProperties, Elements } from './utils';

export type AccordionTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    {
      [key in
        | 'item'
        | 'item__trigger'
        | 'item__content'
        | 'item__icon']: BaseProperties;
    },
    Required
  >;
