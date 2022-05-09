import * as React from 'react';
import { Expander, ExpanderProps } from '@aws-amplify/ui-react';
import { ExpanderPropControlsProps } from './ExpanderPropControls';
import { demoState } from '@/utils/demoState';

interface UseExpanderProps {
  (initialValues: ExpanderProps): ExpanderPropControlsProps;
}

export const useExpanderProps: UseExpanderProps = (initialValues) => {
  const [type, setType] = React.useState(initialValues.type);
  const [isCollapsible, setIsCollapsible] = React.useState(
    initialValues.isCollapsible
  );

  React.useEffect(() => {
    demoState.set(Expander.displayName, {
      type,
      isCollapsible,
    });
  }, [type, isCollapsible]);

  return React.useMemo(
    () => ({
      type,
      setType,
      isCollapsible,
      setIsCollapsible,
    }),
    [type, setType, isCollapsible, setIsCollapsible]
  );
};
