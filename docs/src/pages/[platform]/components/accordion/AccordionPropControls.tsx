import * as React from 'react';

import { CheckboxField, AccordionProps, Flex } from '@aws-amplify/ui-react';

export interface AccordionPropControlsProps extends AccordionProps {
  setAllowMultiple: (
    value: React.SetStateAction<AccordionProps['allowMultiple']>
  ) => void;
  setAllowToggle: (
    value: React.SetStateAction<AccordionProps['allowToggle']>
  ) => void;
}

export const AccordionPropControls: React.FC<AccordionPropControlsProps> = ({
  allowMultiple,
  setAllowMultiple,
  allowToggle,
  setAllowToggle,
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
        name="allowToggle"
        checked={allowToggle}
        value="yes"
        onChange={(event) => setAllowToggle(event.target.checked)}
        label="allowToggle"
      />
    </Flex>
  );
};
