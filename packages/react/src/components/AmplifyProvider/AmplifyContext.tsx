import * as React from 'react';

import { defaultWebTheme, WebTheme } from '@aws-amplify/ui';

export interface AmplifyContextType {
  theme: WebTheme;
}

export const AmplifyContext = React.createContext<AmplifyContextType>({
  theme: defaultWebTheme,
});
