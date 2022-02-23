import * as React from 'react';

import { defaultTheme, Theme } from '@aws-amplify/ui';

export interface AmplifyContextType {
  theme: Theme;
}

export const AmplifyContext = React.createContext<AmplifyContextType>({
  theme: defaultTheme,
});
