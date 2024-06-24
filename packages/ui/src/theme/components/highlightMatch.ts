import { BaseProperties, Elements } from './utils';

export type HighlightMatchTheme<Required extends boolean = false> =
  BaseProperties &
    Elements<
      {
        highlighted?: BaseProperties;
      },
      Required
    >;
