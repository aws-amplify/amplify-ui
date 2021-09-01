import { TabsProps, TabItem, Button } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { TabsPropControlsProps } from './TabsPropControls';

interface UseTabsProps {
  (initialValues: TabsProps): TabsPropControlsProps;
}

export const useTabsProps: UseTabsProps = (initialValues) => {
  const [defaultTab, setDefaultTab] = useState<TabsProps['defaultTab']>(
    initialValues.defaultTab
  );
  const [grow, setGrow] = useState<TabsProps['grow']>(initialValues.grow);
  const [justifyContent, setJustifyContent] = useState<
    TabsProps['justifyContent']
  >(initialValues.justifyContent);
  const children = initialValues.children;

  return {
    defaultTab,
    setDefaultTab,
    grow,
    setGrow,
    children,
    justifyContent,
    setJustifyContent,
  };
};
