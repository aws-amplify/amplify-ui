import * as React from 'react';

import { ScrollViewProps, SelectField } from '@aws-amplify/ui-react';

import { DemoBox } from './DemoBox';

export interface ScrollViewPropControlsProp extends ScrollViewProps {
  setOrientation: (
    value: React.SetStateAction<ScrollViewProps['orientation']>
  ) => void;
}
export const ScrollViewPropControls: React.FC<ScrollViewPropControlsProp> = ({
  orientation,
  setOrientation,
}) => (
  <DemoBox primitiveName="ScrollView">
    <SelectField
      label="Orientation"
      value={orientation}
      onChange={(event) =>
        setOrientation(event.target.value as ScrollViewProps['orientation'])
      }
    >
      <option value="default">default</option>
      <option value="horizontal">horizontal</option>
      <option value="vertical">vertical</option>
    </SelectField>
  </DemoBox>
);
