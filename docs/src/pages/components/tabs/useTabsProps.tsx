import { Tabs, TabsProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { TabsPropControlsProps } from './TabsPropControls';
import { demoState } from '@/utils/demoState';

interface UseTabsProps {
  (initialValues: TabsProps): TabsPropControlsProps;
}

export const useTabsProps: UseTabsProps = (initialValues) => {
  const [currentIndex, setCurrentIndex] = React.useState<
    TabsProps['currentIndex']
  >(initialValues.currentIndex);
  const [spacing, setSpacing] = React.useState<TabsProps['spacing']>(
    initialValues.spacing
  );
  const [justifyContent, setJustifyContent] = React.useState<
    TabsProps['justifyContent']
  >(initialValues.justifyContent);
  const [indicatorPosition, setIndicatorPosition] = React.useState<
    TabsProps['indicatorPosition']
  >(initialValues.indicatorPosition);
  const children = initialValues.children;

  React.useEffect(() => {
    demoState.set(Tabs.displayName, {
      currentIndex,
      spacing,
      justifyContent,
      indicatorPosition,
      children,
    });
  }, [currentIndex, spacing, justifyContent, indicatorPosition, children]);

  return React.useMemo(
    () => ({
      currentIndex,
      setCurrentIndex,
      spacing,
      setSpacing,
      children,
      justifyContent,
      setJustifyContent,
      indicatorPosition,
      setIndicatorPosition,
    }),
    [
      currentIndex,
      setCurrentIndex,
      spacing,
      setSpacing,
      children,
      justifyContent,
      setJustifyContent,
      indicatorPosition,
      setIndicatorPosition,
    ]
  );
};
