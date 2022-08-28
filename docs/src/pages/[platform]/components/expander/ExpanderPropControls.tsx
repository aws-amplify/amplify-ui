import * as React from 'react';

import {
  CheckboxField,
  ExpanderProps,
  SelectField,
  Flex,
} from '@aws-amplify/ui-react';

export interface ExpanderPropControlsProps extends ExpanderProps {
  setType: (value: React.SetStateAction<ExpanderProps['type']>) => void;
  setIsCollapsible: (
    value: React.SetStateAction<ExpanderProps['isCollapsible']>
  ) => void;
}

export const ExpanderPropControls: React.FC<ExpanderPropControlsProps> = ({
  type,
  setType,
  isCollapsible,
  setIsCollapsible,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        label="type"
        value={type}
        onChange={(event) =>
          setType(event.target.value as ExpanderProps['type'])
        }
      >
        <option value="single">single</option>
        <option value="multiple">multiple</option>
      </SelectField>
      {type === 'single' ? (
        <CheckboxField
          name="collapsible"
          checked={isCollapsible}
          value="yes"
          onChange={(event) => setIsCollapsible(event.target.checked)}
          label="isCollapsible"
        />
      ) : null}
    </Flex>
  );
};
