import { createContext, useContext } from 'react';

export const NavigationContext = createContext({
  expanded: false,
  setExpanded: (val: boolean) => null,
  alwaysCollapsible: false,
  setAlwaysCollapsible: (val: boolean) => null,
});

export const useNavigationContext = () => useContext(NavigationContext);
