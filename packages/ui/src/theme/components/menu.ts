import { ComponentStyles, Elements } from './utils';

export type MenuTheme<Required extends boolean = false> = ComponentStyles &
  Elements<
    {
      [key in
        | 'wrapper'
        | 'trigger'
        | 'content'
        | 'content__item']?: ComponentStyles;
    },
    Required
  >;
