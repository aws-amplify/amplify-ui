import { TabsProps, TabItem, Button } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { TabsPropControlsProps } from './TabsPropControls';

interface UseTabsProps {
  (initialValues: TabsProps): TabsPropControlsProps;
}

export const useTabsProps: UseTabsProps = (initialValues) => {
  const [currentIndex, setCurrentIndex] = useState<TabsProps['currentIndex']>(
    initialValues.currentIndex
  );
  const [spacing, setSpacing] = useState<TabsProps['spacing']>(
    initialValues.spacing
  );
  const [justifyContent, setJustifyContent] = useState<
    TabsProps['justifyContent']
  >(initialValues.justifyContent);
  const [indicatorPosition, setIndicatorPosition] = useState<
    TabsProps['indicatorPosition']
  >(initialValues.indicatorPosition);
  const children = initialValues.children;

  return {
    currentIndex,
    setCurrentIndex,
    spacing,
    setSpacing,
    children,
    justifyContent,
    setJustifyContent,
    indicatorPosition,
    setIndicatorPosition,
  };
};
