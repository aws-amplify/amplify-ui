import * as React from 'react';
import { Accordion, AccordionProps } from '@aws-amplify/ui-react';
import { AccordionPropControlsProps } from './AccordionPropControls';
import { demoState } from '@/utils/demoState';

interface UseAccordionProps {
  (initialValues: AccordionProps): AccordionPropControlsProps;
}

export const useAccordionProps: UseAccordionProps = (initialValues) => {
  const [allowMultiple, setAllowMultiple] = React.useState(
    initialValues.allowMultiple
  );
  const [isAlwaysOpen, setIsAlwaysOpen] = React.useState(
    initialValues.isAlwaysOpen
  );

  React.useEffect(() => {
    demoState.set(Accordion.displayName, {
      allowMultiple,
      isAlwaysOpen,
    });
  }, [allowMultiple, isAlwaysOpen]);

  return React.useMemo(
    () => ({
      allowMultiple,
      setAllowMultiple,
      isAlwaysOpen,
      setIsAlwaysOpen,
    }),
    [allowMultiple, setAllowMultiple, isAlwaysOpen, setIsAlwaysOpen]
  );
};
