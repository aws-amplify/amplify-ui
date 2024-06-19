import { createComponentTheme } from '../createTheme';
import { WebTheme } from '../types';
import { Modifiers, BaseProperties, Elements, ColorTheme } from './utils';

export type ToggleButtonTheme<Required extends boolean = false> =
  BaseProperties & Modifiers<'primary' | 'pressed' | 'link', Required>;

export const toggleButtonTheme = createComponentTheme<ToggleButtonTheme<true>>({
  name: 'togglebutton',
  theme(tokens) {
    const {
      components: { togglebutton },
    } = tokens;
    return {
      _modifiers: {
        primary: {},
        pressed: {},
        link: {},
      },
    };
  },
});
