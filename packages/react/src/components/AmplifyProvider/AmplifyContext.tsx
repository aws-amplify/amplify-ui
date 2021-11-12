import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';

import * as primitives from '../../primitives/components';

interface AmplifyContextType {
  components: Partial<typeof primitives>;
  theme: WebTheme;
}

export const AmplifyContext = React.createContext<AmplifyContextType>({
  components: primitives,
  theme: defaultTheme,
});
