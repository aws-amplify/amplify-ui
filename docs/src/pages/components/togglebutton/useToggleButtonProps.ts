import * as React from 'react';
import { ToggleButtonProps } from '@aws-amplify/ui-react';

import { ToggleButtonPropControlsProps } from './ToggleButtonPropControls';

interface UseToggleButtonProps {
  (initialValues: ToggleButtonProps): ToggleButtonPropControlsProps;
}

export const useToggleButtonProps: UseToggleButtonProps = (initialValues) => {
  const [isDisabled, setIsDisabled] = React.useState<
    ToggleButtonProps['isDisabled']
  >(initialValues.isDisabled);

  const [size, setSize] = React.useState<ToggleButtonProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<
    ToggleButtonProps['variation']
  >(initialValues.variation);

  return {
    isDisabled,
    setIsDisabled,
    size,
    setSize,
    variation,
    setVariation,
  };
};
