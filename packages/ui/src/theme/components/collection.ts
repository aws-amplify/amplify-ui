import { ComponentStyles, Elements } from './utils';

export type CollectionTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        [key in 'pagination' | 'search' | 'items']?: ComponentStyles;
      },
      Required
    >;
