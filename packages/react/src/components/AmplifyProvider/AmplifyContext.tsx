import { createContext, ReactNode } from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';

interface AmplifyContextType {
  components: Record<string, ReactNode>;
  theme: WebTheme;
}

export const AmplifyContext = createContext<AmplifyContextType>({
  components: undefined,
  theme: defaultTheme,
});
