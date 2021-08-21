import React from 'react';
import { DividerOptions } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';
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
    <DemoBox primitiveName="Divider">
      <FieldLabeler id="size">
        <select
          name="size"
          id="size"
          value={size}
          onChange={(event) =>
            setSize(event.target.value as DividerOptions['size'])
          }
        >
          <option value="">default</option>
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="orientation">
        <select
          name="orientation"
          id="orientation"
          value={orientation}
          onChange={(event) =>
            setOrientation(event.target.value as DividerOptions['orientation'])
          }
        >
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </select>
      </FieldLabeler>
    </DemoBox>
  );
};
