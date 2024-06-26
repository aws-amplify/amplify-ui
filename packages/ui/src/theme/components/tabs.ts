import { ComponentStyles, Elements, Modifiers } from './utils';

export type TabsTheme<Required extends boolean = false> = ComponentStyles &
  Elements<
    {
      list?: ComponentStyles &
        Modifiers<'equal' | 'relative' | 'top' | 'bottom'>;
      panel?: ComponentStyles & Modifiers<'active'>;
      item?: ComponentStyles & Modifiers<'active'>;
    },
    Required
  >;
