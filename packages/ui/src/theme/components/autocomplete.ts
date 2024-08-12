import { Modifiers, ComponentStyles, Elements } from './utils';

export type AutoCompleteTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        menu?: ComponentStyles & Modifiers<'empty' | 'loading', Required>;
        menu__option?: ComponentStyles & Modifiers<'active', Required>;
        menu__options?: ComponentStyles;
        menu__header?: ComponentStyles;
        menu__footer?: ComponentStyles;
      },
      Required
    >;
