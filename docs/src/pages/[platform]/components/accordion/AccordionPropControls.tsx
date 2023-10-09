import * as React from 'react';

import { CheckboxField, AccordionProps, Flex } from '@aws-amplify/ui-react';

export interface AccordionPropControlsProps extends AccordionProps {
  setAllowMultiple: (
    value: React.SetStateAction<AccordionProps['allowMultiple']>
  ) => void;
  setIsAlwaysOpen: (
    value: React.SetStateAction<AccordionProps['isAlwaysOpen']>
  ) => void;
}

export const AccordionPropControls: React.FC<AccordionPropControlsProps> = ({
  allowMultiple,
  setAllowMultiple,
  isAlwaysOpen,
  setIsAlwaysOpen,
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
        name="isAlwaysOpen"
        checked={isAlwaysOpen}
        value="yes"
        onChange={(event) => setIsAlwaysOpen(event.target.checked)}
        label="isAlwaysOpen"
      />
    </Flex>
  );
};
