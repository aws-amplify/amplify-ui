import { MenuProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { MenuPropControlsProps } from './MenuPropControls';

interface UseMenuProps {
  (initialValues?: MenuProps): MenuPropControlsProps;
}

export const useMenuProps: UseMenuProps = (initialValues) => {
  const [menuAlign, setMenuAlign] = useState<MenuProps['menuAlign']>(
    initialValues.align
  );
  const [size, setSize] = useState<MenuProps['size']>(initialValues.size);

  return {
    ...initialValues,
    menuAlign,
    size,
    setMenuAlign,
    setSize,
  };
};
