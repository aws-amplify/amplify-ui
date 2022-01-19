import { FlexProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FlexPropControlsProps } from './FlexPropControls';

interface UseFlexProps {
  (initialValues: FlexProps): FlexPropControlsProps;
}

export const useFlexProps: UseFlexProps = (initialValues) => {
  const [direction, setDirection] = useState<FlexProps['direction']>(
    initialValues.direction
  );
  const [justifyContent, setJustifyContent] = useState<
    FlexProps['justifyContent']
  >(initialValues.justifyContent);
  const [alignItems, setAlignItems] = useState<FlexProps['alignItems']>(
    initialValues.alignItems
  );
  const [alignContent, setAlignContent] = useState<FlexProps['alignContent']>(
    initialValues.alignContent
  );
  const [wrap, setWrap] = useState<FlexProps['wrap']>(initialValues.wrap);
  const [gap, setGap] = useState<string>(initialValues.gap as string);

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
