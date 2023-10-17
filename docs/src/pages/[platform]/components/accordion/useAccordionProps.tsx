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
  const [preventCollapse, setPreventCollapse] = React.useState(
    initialValues.preventCollapse
  );

  React.useEffect(() => {
    demoState.set(Accordion.displayName, {
      allowMultiple,
      preventCollapse,
    });
  }, [allowMultiple, preventCollapse]);

  return React.useMemo(
    () => ({
      allowMultiple,
      setAllowMultiple,
      preventCollapse,
      setPreventCollapse,
    }),
    [allowMultiple, setAllowMultiple, preventCollapse, setPreventCollapse]
  );
};
