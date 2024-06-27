import { ComponentStyles, Elements, Modifiers } from './utils';

export type BreadcrumbsTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        list?: ComponentStyles;
        separator?: ComponentStyles;
        item?: ComponentStyles;
        link?: ComponentStyles & Modifiers<'current', Required>;
      },
      Required
    >;
