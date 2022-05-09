import * as React from 'react';
import { Flex, FlexProps } from '@aws-amplify/ui-react';
import { FlexPropControlsProps } from './FlexPropControls';
import { demoState } from '@/utils/demoState';

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

  React.useEffect(() => {
    demoState.set(Flex.displayName, {
      direction,
      justifyContent,
      alignItems,
      alignContent,
      wrap,
      gap,
    });
  }, [direction, justifyContent, alignItems, alignContent, wrap, gap]);

  return React.useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
};
