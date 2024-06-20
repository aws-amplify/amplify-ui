import { BaseProperties, Elements } from './utils';

export type CollectionTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    {
      [key in 'pagination' | 'search']: BaseProperties;
    },
    Required
  >;
