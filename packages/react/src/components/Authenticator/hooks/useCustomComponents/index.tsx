import * as React from 'react';

import { defaultComponents, DefaultComponents } from './defaultComponents';

export interface ComponentsProviderProps {
  components?: DefaultComponents;
}

export const CustomComponentsContext =
  React.createContext<ComponentsProviderProps>({
    components: { ...defaultComponents },
  });

export const useCustomComponents = () => {
  return React.useContext(CustomComponentsContext);
};
