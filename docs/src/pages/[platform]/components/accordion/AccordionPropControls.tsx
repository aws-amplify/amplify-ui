import * as React from 'react';

import { CheckboxField, AccordionProps, Flex } from '@aws-amplify/ui-react';

export interface AccordionPropControlsProps extends AccordionProps {
  setIsExclusive: (
    value: React.SetStateAction<AccordionProps['isExclusive']>
  ) => void;
  setIsCollapsible: (
    value: React.SetStateAction<AccordionProps['isCollapsible']>
  ) => void;
}

export const AccordionPropControls: React.FC<AccordionPropControlsProps> = ({
  isExclusive,
  setIsExclusive,
  isCollapsible,
  setIsCollapsible,
}) => {
  return (
    <Flex direction="column">
      <CheckboxField
        name="collapsible"
        checked={isExclusive}
        value="yes"
        onChange={(event) => setIsExclusive(event.target.checked)}
        label="isExclusive"
      />
      <CheckboxField
        name="collapsible"
        checked={isCollapsible}
        value="yes"
        onChange={(event) => setIsCollapsible(event.target.checked)}
        label="isCollapsible"
      />
    </Flex>
  );
};
