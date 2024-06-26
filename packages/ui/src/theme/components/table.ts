import { Modifiers, ComponentStyles, Size, Elements } from './utils';

export type TableTheme<Required extends boolean = false> = ComponentStyles &
  Modifiers<Size | 'bordered' | 'striped', Required> &
  Elements<
    {
      [key in
        | 'caption'
        | 'head'
        | 'body'
        | 'foot'
        | 'row'
        | 'th'
        | 'td']?: ComponentStyles;
    },
    Required
  >;
