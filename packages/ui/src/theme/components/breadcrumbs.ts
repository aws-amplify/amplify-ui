import { BaseProperties, Elements } from './utils';

export type BreadcrumbsTheme<Required extends boolean = false> =
  BaseProperties &
    Elements<
      {
        [key in 'list' | 'separator' | 'item' | 'link']: BaseProperties;
      },
      Required
    >;
