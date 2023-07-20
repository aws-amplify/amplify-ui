import * as React from 'react';
import {
  IconContext,
  IconContextInterface,
} from '../components/IconProvider/IconContext';

export const useIcons = (): IconContextInterface | undefined => {
  const context = React.useContext(IconContext);
  return context;
};
