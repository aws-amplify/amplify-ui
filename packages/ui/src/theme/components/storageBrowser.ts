import { Modifiers, ComponentStyles, Elements } from './utils';

type TableCellVariations = 'download' | 'select' | 'cancel';

export type StorageBrowserTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        error?: ComponentStyles;
        navigation?: ComponentStyles;
        title?: ComponentStyles;
        controls?: ComponentStyles;
        controls__pagination?: ComponentStyles;
        controls__search?: ComponentStyles;
        controls__refresh?: ComponentStyles;
        controls__menu?: ComponentStyles;

        action?: ComponentStyles;
        action__options?: ComponentStyles;
        action__summary?: ComponentStyles;
        action__footer?: ComponentStyles;
        action__status?: ComponentStyles;
        action__message?: ComponentStyles;
        action__buttons?: ComponentStyles;

        table?: ComponentStyles;
        table__wrapper?: ComponentStyles;

        table__head?: ComponentStyles;
        table__header?: Modifiers<TableCellVariations, Required> &
          ComponentStyles;
        table__header__button?: ComponentStyles;
        table__body?: ComponentStyles;
        table__row?: ComponentStyles;
        table__data?: Modifiers<TableCellVariations, Required> &
          ComponentStyles;
      },
      Required
    >;
