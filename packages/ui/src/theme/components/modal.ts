import type { ComponentStyles, Elements } from './utils';

export type ModalTheme<Required extends boolean = false> = ComponentStyles &
  Elements<
    {
      overlay?: ComponentStyles;
      content?: ComponentStyles;
      header?: ComponentStyles;
      title?: ComponentStyles;
      body?: ComponentStyles;
      footer?: ComponentStyles;
      'close-button'?: ComponentStyles;
    },
    Required
  >;
