import React from 'react';
import { PartialDeep } from 'src/types';
import { defaultComponents } from './defaultComponents';

export interface ComponentsProviderProps {
  components?: PartialDeep<typeof defaultComponents>;
}

export const CustomComponentsContext =
  React.createContext<ComponentsProviderProps>({
    components: { ...defaultComponents },
  });

export const useCustomComponents = () => {
  return React.useContext(CustomComponentsContext);
};
