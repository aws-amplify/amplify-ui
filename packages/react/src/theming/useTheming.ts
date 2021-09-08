import { useContext } from 'react';

import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

export const useTheming = () => {
  const { theming } = useContext(AmplifyContext);

  return theming;
};
