import * as React from 'react';

import { ExpanderProps } from '@aws-amplify/ui-react';

import { ExpanderPropControlsProps } from './ExpanderPropControls';

interface UseExpanderProps {
  (initialValues: ExpanderProps): ExpanderPropControlsProps;
}

export const useExpanderProps: UseExpanderProps = (initialValues) => {
  const [type, setType] = React.useState(initialValues.type);
  const [isCollapsible, setIsCollapsible] = React.useState(
    initialValues.isCollapsible
  );
  return {
    isCollapsible,
    setIsCollapsible,
    type,
    setType,
  };
};
