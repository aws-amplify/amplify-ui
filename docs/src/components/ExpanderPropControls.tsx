import * as React from 'react';

import {
  CheckboxField,
  ExpanderProps,
  SelectField,
} from '@aws-amplify/ui-react';

import { DemoBox } from './DemoBox';

export interface ExpanderPropControlsProps extends ExpanderProps {
  setIsCollapsible: (
    value: React.SetStateAction<ExpanderProps['isCollapsible']>
  ) => void;
  setType: (value: React.SetStateAction<ExpanderProps['type']>) => void;
}

export const ExpanderPropControls: React.FC<ExpanderPropControlsProps> = ({
  type,
  setType,
  isCollapsible,
  setIsCollapsible,
}) => {
  return (
    <DemoBox primitiveName="Expander">
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
        >
          isCollapsible
        </CheckboxField>
      ) : null}
    </DemoBox>
  );
};
