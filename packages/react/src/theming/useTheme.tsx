import { useContext } from 'react';

import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

export const useTheme = <T,>() => {
  const {
    theme: { themeObject, CSSVariables },
  } = useContext(AmplifyContext);

  return { themeObject: themeObject as T, CSSVariables };
};
