import { createContext, ReactNode } from 'react';

import { defaultTheme, Theme } from '@aws-amplify/ui';

interface AmplifyContextType {
  components: Record<string, ReactNode>;
  theme: Theme;
}

export const AmplifyContext = createContext<AmplifyContextType>({
  components: undefined,
  theme: defaultTheme,
});
