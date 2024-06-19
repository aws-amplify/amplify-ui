import { createComponentTheme } from '../createTheme';
import { BaseProperties, Elements, Modifiers } from './utils';

export type TabsTheme<Required extends boolean = false> = BaseProperties &
  Elements<
    'list',
    Required,
    BaseProperties & Modifiers<'equal' | 'relative' | 'top' | 'bottom'>
  > &
  Elements<'panel', Required, BaseProperties & Modifiers<'active'>> &
  Elements<'item', Required, BaseProperties & Modifiers<'active'>>;

const tabsTheme = createComponentTheme<TabsTheme<true>>({
  name: 'accordion',
  theme(tokens) {
    return {
      _element: {
        list: {
          _modifiers: {
            equal: {},
            relative: {},
            top: {},
            bottom: {},
          },
        },
        panel: {
          _modifiers: {
            active: {},
          },
        },
        item: {
          _modifiers: {
            active: {},
          },
        },
      },
    };
  },
});
