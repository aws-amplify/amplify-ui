import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';

interface AmplifyContextType {
  theme: WebTheme;
}

export const AmplifyContext = React.createContext<AmplifyContextType>({
  theme: defaultTheme,
});
