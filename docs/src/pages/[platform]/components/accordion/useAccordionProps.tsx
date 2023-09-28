import * as React from 'react';
import { Accordion, AccordionProps } from '@aws-amplify/ui-react';
import { AccordionPropControlsProps } from './AccordionPropControls';
import { demoState } from '@/utils/demoState';

interface UseAccordionProps {
  (initialValues: AccordionProps): AccordionPropControlsProps;
}

export const useAccordionProps: UseAccordionProps = (initialValues) => {
  const [isExclusive, setIsExclusive] = React.useState(
    initialValues.isCollapsible
  );
  const [isCollapsible, setIsCollapsible] = React.useState(
    initialValues.isCollapsible
  );

  React.useEffect(() => {
    demoState.set(Accordion.displayName, {
      isExclusive,
      isCollapsible,
    });
  }, [isExclusive, isCollapsible]);

  return React.useMemo(
    () => ({
      isExclusive,
      setIsExclusive,
      isCollapsible,
      setIsCollapsible,
    }),
    [isExclusive, setIsExclusive, isCollapsible, setIsCollapsible]
  );
};
