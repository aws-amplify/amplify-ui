import { MenuProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { MenuPropControlsProps } from './MenuPropControls';

interface UseMenuProps {
  (initialValues?: MenuProps): MenuPropControlsProps;
}

export const useMenuProps: UseMenuProps = (initialValues) => {
  const [menuAlign, setMenuAlign] = React.useState<MenuProps['menuAlign']>(
    initialValues.menuAlign
  );
  const [size, setSize] = React.useState<MenuProps['size']>(initialValues.size);

  return {
    ...initialValues,
    menuAlign,
    size,
    setMenuAlign,
    setSize,
  };
};
