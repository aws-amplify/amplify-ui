import React from 'react';
import { TabsProps } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';
import { DemoBox } from './DemoBox';

export interface TabsPropControlsProps extends TabsProps {
  setCurrentIndex: (
    value: React.SetStateAction<TabsProps['currentIndex']>
  ) => void;
  setSpacing: (value: React.SetStateAction<TabsProps['spacing']>) => void;
  setJustifyContent: (
    value: React.SetStateAction<TabsProps['justifyContent']>
  ) => void;
  setIndicatorPosition: (
    value: React.SetStateAction<TabsProps['indicatorPosition']>
  ) => void;
}

interface TabsPropControlsInterface {
  (props: TabsPropControlsProps): JSX.Element;
}

export const TabsPropControls: TabsPropControlsInterface = ({
  currentIndex,
  setCurrentIndex,
  spacing,
  setSpacing,
  justifyContent,
  setJustifyContent,
  indicatorPosition,
  setIndicatorPosition,
}) => {
  return (
    <DemoBox primitiveName="Tabs">
      <FieldLabeler id="currentIndex">
        <select
          name="currentIndex"
          id="currentIndex"
          value={currentIndex}
          onChange={(event) =>
            setCurrentIndex(+event.target.value as TabsProps['currentIndex'])
          }
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="spacing">
        <select
          name="spacing"
          id="spacing"
          value={spacing}
          onChange={(event) =>
            setSpacing(event.target.value as TabsProps['spacing'])
          }
        >
          <option value="">default</option>
          <option value="equal">equal</option>
          <option value="relative">relative</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="indicatorPosition">
        <select
          name="indicatorPosition"
          id="indicatorPosition"
          value={indicatorPosition}
          onChange={(event) =>
            setIndicatorPosition(
              event.target.value as TabsProps['indicatorPosition']
            )
          }
        >
          <option value="">default</option>
          <option value="top">top</option>
        </select>
      </FieldLabeler>

      <FieldLabeler id="justifyContent">
        <select
          name="justifyContent"
          id="justifyContent"
          value={justifyContent}
          onChange={(event) =>
            setJustifyContent(event.target.value as TabsProps['justifyContent'])
          }
        >
          <option value="flex-start">flex-start</option>
          <option value="flex-end">flex-end</option>
          <option value="center">center</option>
          <option value="space-between">space-between</option>
          <option value="space-around">space-around</option>
          <option value="space-evenly">space-evenly</option>
        </select>
      </FieldLabeler>
    </DemoBox>
  );
};
