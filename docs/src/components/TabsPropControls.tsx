import React from 'react';
import { TabsProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface TabsPropControlsProps extends TabsProps {
  setDefaultTab: (value: React.SetStateAction<TabsProps['defaultTab']>) => void;
  setGrow: (value: React.SetStateAction<TabsProps['grow']>) => void;
}

interface TabsPropControlsInterface {
  (props: TabsPropControlsProps): JSX.Element;
}

export const TabsPropControls: TabsPropControlsInterface = ({
  defaultTab,
  setDefaultTab,
  grow,
  setGrow,
}) => {
  return (
    <DemoBox primitiveName="Tabs">
      <FieldLabeler id="defaultTab">
        <select
          name="defaultTab"
          id="defaultTab"
          value={defaultTab}
          onChange={(event) =>
            setDefaultTab(+event.target.value as TabsProps['defaultTab'])
          }
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="grow">
        <select
          name="grow"
          id="grow"
          value={grow}
          onChange={(event) => setGrow(event.target.value as TabsProps['grow'])}
        >
          <option value="">default</option>
          <option value="equal">equal</option>
          <option value="relative">relative</option>
        </select>
      </FieldLabeler>
    </DemoBox>
  );
};
