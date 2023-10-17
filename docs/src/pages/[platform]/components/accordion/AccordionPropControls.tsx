import * as React from 'react';

import { CheckboxField, AccordionProps, Flex } from '@aws-amplify/ui-react';

export interface AccordionPropControlsProps extends AccordionProps {
  setAllowMultiple: (
    value: React.SetStateAction<AccordionProps['allowMultiple']>
  ) => void;
  setPreventCollapse: (
    value: React.SetStateAction<AccordionProps['preventCollapse']>
  ) => void;
}

export const AccordionPropControls: React.FC<AccordionPropControlsProps> = ({
  allowMultiple,
  setAllowMultiple,
  preventCollapse,
  setPreventCollapse,
}) => {
  return (
    <Flex direction="column">
      <CheckboxField
        name="allowMultiple"
        checked={allowMultiple}
        value="yes"
        onChange={(event) => setAllowMultiple(event.target.checked)}
        label="allowMultiple"
      />
      <CheckboxField
        name="preventCollapse"
        checked={preventCollapse}
        value="yes"
        onChange={(event) => setPreventCollapse(event.target.checked)}
        label="preventCollapse"
      />
    </Flex>
  );
};
