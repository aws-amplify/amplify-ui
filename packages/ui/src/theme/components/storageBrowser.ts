import { ComponentStyles, Elements } from './utils';

export type StorageBrowserTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        table?: ComponentStyles;
        table__wrapper?: ComponentStyles;
        table__actions?: ComponentStyles;
        table__search?: ComponentStyles;

        table__head?: ComponentStyles;
        table__header?: ComponentStyles;
        table__header__button?: ComponentStyles;
        table__body?: ComponentStyles;
        table__row?: ComponentStyles;
        table__data?: ComponentStyles;

        title?: ComponentStyles;
        navigation?: ComponentStyles;

        header?: ComponentStyles;
        header__start?: ComponentStyles;
        header__end?: ComponentStyles;

        footer?: ComponentStyles;
        footer__start?: ComponentStyles;
        footer__end?: ComponentStyles;

        action__footer?: ComponentStyles;
        action__status?: ComponentStyles;
        //
        action__buttons?: ComponentStyles;

        locations?: ComponentStyles;
        locations__controls?: ComponentStyles;

        'location-details'?: ComponentStyles;
        'location-details__controls'?: ComponentStyles;
        'location-details__search'?: ComponentStyles;
      },
      Required
    >;
