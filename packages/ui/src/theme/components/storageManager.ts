import { Modifiers, ComponentStyles, Elements, ColorTheme } from './utils';

export type StorageManagerTheme<Required extends boolean = false> =
  ComponentStyles &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        dropzone?: ComponentStyles & Modifiers<'active' | 'small', Required>;
        dropzone__icon?: ComponentStyles;
        dropzone__text?: ComponentStyles;
        file?: ComponentStyles;
        file__picker?: ComponentStyles;
        file__wrapper?: ComponentStyles;
        file__name?: ComponentStyles;
        file__size?: ComponentStyles;
        file__list?: ComponentStyles;
        file__main?: ComponentStyles;
        file__image?: ComponentStyles;
        file__status?: ComponentStyles &
          Modifiers<'error' | 'success', Required>;
        loader?: ComponentStyles;
        previewer?: ComponentStyles;
        previewer__text?: ComponentStyles;
        previewer__footer?: ComponentStyles;
        previewer__actions?: ComponentStyles;
      },
      Required
    >;
