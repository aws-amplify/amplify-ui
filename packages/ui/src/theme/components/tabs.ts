import { createComponentTheme } from '../createTheme';
import { BaseProperties, Elements, Modifiers } from './utils';

export type TabsTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    {
      list?: BaseProperties &
        Modifiers<'equal' | 'relative' | 'top' | 'bottom'>;
      panel?: BaseProperties & Modifiers<'active'>;
      item?: BaseProperties & Modifiers<'active'>;
    },
    Required
  >;
