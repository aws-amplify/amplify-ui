import { Menu, MenuProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { MenuPropControlsProps } from './MenuPropControls';
import { demoState } from '@/utils/demoState';

interface UseMenuProps {
  (initialValues?: MenuProps): MenuPropControlsProps;
}

export const useMenuProps: UseMenuProps = (initialValues) => {
  const [menuAlign, setMenuAlign] = React.useState<MenuProps['menuAlign']>(
    initialValues.menuAlign
  );
  const [size, setSize] = React.useState<MenuProps['size']>(initialValues.size);

  React.useEffect(() => {
    demoState.set(Menu.displayName, { menuAlign, size });
  }, [menuAlign, size]);

  return React.useMemo(
    () => ({
      ...initialValues,
      menuAlign,
      size,
      setMenuAlign,
      setSize,
    }),
    [initialValues, menuAlign, size, setMenuAlign, setSize]
  );
};
