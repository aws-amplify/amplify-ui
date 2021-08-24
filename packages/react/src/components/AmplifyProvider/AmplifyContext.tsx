import { createContext } from 'react';

import { defaultTheme } from '../../theming';

export const AmplifyContext = createContext({
  components: undefined,
  theme: defaultTheme,
});
