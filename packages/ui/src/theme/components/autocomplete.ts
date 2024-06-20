import { Modifiers, BaseProperties, Elements } from './utils';

export type AutoCompleteTheme<Required extends boolean = false> =
  BaseProperties &
    Elements<
      {
        menu?: BaseProperties & Modifiers<'empty' | 'loading', Required>;
        menu__option?: BaseProperties & Modifiers<'active', Required>;
        menu__options?: BaseProperties;
        menu__header?: BaseProperties;
        menu__footer?: BaseProperties;
      },
      Required
    >;
