import { TabsProps, TabItem, Button } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { TabsPropControlsProps } from './TabsPropControls';

interface UseTabsProps {
  (initialValues: TabsProps): TabsPropControlsProps;
}

export const useTabsProps: UseTabsProps = (initialValues) => {
  const [defaultIndex, setDefaultIndex] = useState<TabsProps['defaultIndex']>(
    initialValues.defaultIndex
  );
  const [grow, setGrow] = useState<TabsProps['grow']>(initialValues.grow);
  const [justifyContent, setJustifyContent] = useState<
    TabsProps['justifyContent']
  >(initialValues.justifyContent);
  const [indicatorPosition, setIndicatorPosition] = useState<
    TabsProps['indicatorPosition']
  >(initialValues.indicatorPosition);
  const children = initialValues.children;

  return {
    defaultIndex,
    setDefaultIndex,
    grow,
    setGrow,
    children,
    justifyContent,
    setJustifyContent,
    indicatorPosition,
    setIndicatorPosition,
  };
};
