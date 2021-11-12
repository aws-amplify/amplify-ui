import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';

interface AmplifyContextType {
  components: Record<string, any>;
  theme: WebTheme;
}

export const AmplifyContext = React.createContext<AmplifyContextType>({
  components: undefined,
  theme: defaultTheme,
});
