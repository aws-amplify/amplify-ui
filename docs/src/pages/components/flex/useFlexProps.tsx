import * as React from 'react';
import { FlexProps } from '@aws-amplify/ui-react';
import { FlexPropControlsProps } from './FlexPropControls';

interface UseFlexProps {
  (initialValues: FlexProps): FlexPropControlsProps;
}

export const useFlexProps: UseFlexProps = (initialValues) => {
  const [direction, setDirection] = React.useState<FlexProps['direction']>(
    initialValues.direction
  );
  const [justifyContent, setJustifyContent] = React.useState<
    FlexProps['justifyContent']
  >(initialValues.justifyContent);
  const [alignItems, setAlignItems] = React.useState<FlexProps['alignItems']>(
    initialValues.alignItems
  );
  const [alignContent, setAlignContent] = React.useState<
    FlexProps['alignContent']
  >(initialValues.alignContent);
  const [wrap, setWrap] = React.useState<FlexProps['wrap']>(initialValues.wrap);
  const [gap, setGap] = React.useState<string>(initialValues.gap as string);

  return {
    direction,
    setDirection,
    justifyContent,
    setJustifyContent,
    alignItems,
    setAlignItems,
    alignContent,
    setAlignContent,
    wrap,
    setWrap,
    gap,
    setGap,
  };
};
