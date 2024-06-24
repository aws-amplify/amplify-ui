import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export type StorageManagerTheme<Required extends boolean = false> =
  BaseProperties &
    Modifiers<ColorTheme, Required> &
    Elements<
      {
        dropzone?: BaseProperties & Modifiers<'active' | 'small', Required>;
        dropzone__icon?: BaseProperties;
        dropzone__text?: BaseProperties;
        file?: BaseProperties;
        file__picker?: BaseProperties;
        file__wrapper?: BaseProperties;
        file__name?: BaseProperties;
        file__size?: BaseProperties;
        file__list?: BaseProperties;
        file__main?: BaseProperties;
        file__image?: BaseProperties;
        file__status?: BaseProperties &
          Modifiers<'error' | 'success', Required>;
        loader?: BaseProperties;
        previewer?: BaseProperties;
        previewer__text?: BaseProperties;
        previewer__footer?: BaseProperties;
        previewer__actions?: BaseProperties;
      },
      Required
    >;
