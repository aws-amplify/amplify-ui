import * as React from 'react';

import { createTheme, WebTheme } from '@aws-amplify/ui';

export interface AmplifyContextType {
  theme: WebTheme;
}

export const AmplifyContext = React.createContext<AmplifyContextType>({
  theme: createTheme(),
});
