import { ComponentStyles, Elements } from './utils';

export type AccordionTheme<Required extends boolean = false> = ComponentStyles &
  Elements<
    {
      [key in
        | 'item'
        | 'item__trigger'
        | 'item__content'
        | 'item__icon']?: ComponentStyles;
    },
    Required
  >;
