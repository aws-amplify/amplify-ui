import {
  createTheme,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react/server';
import { buttonTheme } from './buttonTheme';
import { alertTheme } from './alertTheme';
import { avatarTheme } from '@/components/Avatar';
import { badgeTheme } from './badgeTheme';
import { headerTheme } from '@/components/Header';

export const defaultTheme = createTheme({
  name: 'default-theme',
  overrides: [defaultDarkModeOverride],
});

export const theme = createTheme({
  name: 'my-theme',
  components: [buttonTheme, alertTheme, avatarTheme, badgeTheme, headerTheme],
  overrides: [defaultDarkModeOverride],
});
