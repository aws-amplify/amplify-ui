import { BaseProperties, Elements, Modifiers } from './utils';

export type BreadcrumbsTheme<Required extends boolean = false> =
  BaseProperties &
    Elements<
      {
        list?: BaseProperties;
        separator?: BaseProperties;
        item?: BaseProperties;
        link?: BaseProperties & Modifiers<'current', Required>;
      },
      Required
    >;
