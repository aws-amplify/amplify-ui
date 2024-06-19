import { createComponentTheme } from '../createTheme';
import { BaseProperties } from './utils';

export type ToggleButtonGroupTheme<Required extends boolean = false> =
  BaseProperties;

export const toggleButtonGroupTheme = createComponentTheme<
  ToggleButtonGroupTheme<true>
>({
  name: 'togglebutton',
  theme(tokens) {
    const {
      components: { togglebuttongroup },
    } = tokens;
    return {
      alignItems: togglebuttongroup.alignItems,
      alignContent: togglebuttongroup.alignContent,
      justifyContent: togglebuttongroup.justifyContent,
      gap: 0,
    };
  },
});
