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
  const [allowToggle, setAllowToggle] = React.useState(
    initialValues.allowToggle
  );

  React.useEffect(() => {
    demoState.set(Accordion.displayName, {
      allowMultiple,
      allowToggle,
    });
  }, [allowMultiple, allowToggle]);

  return React.useMemo(
    () => ({
      allowMultiple,
      setAllowMultiple,
      allowToggle,
      setAllowToggle,
    }),
    [allowMultiple, setAllowMultiple, allowToggle, setAllowToggle]
  );
};
