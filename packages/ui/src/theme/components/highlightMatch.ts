import { ComponentStyles, Elements } from './utils';

export type HighlightMatchTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        highlighted?: ComponentStyles;
      },
      Required
    >;
