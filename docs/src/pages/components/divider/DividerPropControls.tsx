import React from 'react';
import { DividerOptions, Flex, SelectField } from '@aws-amplify/ui-react';
import { FieldLabeler } from '../../../components/FieldLabeler';
import { DemoBox } from '../../../components/DemoBox';
export interface DividerPropControlsProps extends DividerOptions {
  setSize: (value: React.SetStateAction<DividerOptions['size']>) => void;
  setOrientation: (
    value: React.SetStateAction<DividerOptions['orientation']>
  ) => void;
}

interface DividerPropControlsInterface {
  (props: DividerPropControlsProps): JSX.Element;
}

export const DividerPropControls: DividerPropControlsInterface = ({
  size,
  setSize,
  orientation,
  setOrientation,
}) => {
  return (
    <Flex direction="column">
      <SelectField
        name="size"
        id="size"
        label="Size"
        value={size}
        onChange={(event) =>
          setSize(event.target.value as DividerOptions['size'])
        }
      >
        <option value="">default</option>
        <option value="small">small</option>
        <option value="large">large</option>
      </SelectField>

      <SelectField
        name="orientation"
        id="orientation"
        label="Orientation"
        value={orientation}
        onChange={(event) =>
          setOrientation(event.target.value as DividerOptions['orientation'])
        }
      >
        <option value="horizontal">horizontal</option>
        <option value="vertical">vertical</option>
      </SelectField>
    </Flex>
  );
};
