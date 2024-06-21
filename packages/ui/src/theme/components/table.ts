import { Modifiers, BaseProperties, Size, Elements } from './utils';

export type TableTheme<Required extends boolean = false> = BaseProperties &
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
        | 'td']?: BaseProperties;
    },
    Required
  >;
