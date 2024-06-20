import { BaseProperties, Elements } from './utils';

export type MenuTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    {
      [key in
        | 'wrapper'
        | 'trigger'
        | 'content'
        | 'content__item']?: BaseProperties;
    },
    Required
  >;
