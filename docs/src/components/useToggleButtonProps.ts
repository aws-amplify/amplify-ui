import { useState } from 'react';

import { ToggleButtonProps } from '@aws-amplify/ui-react';

import { ToggleButtonPropControlsProps } from './ToggleButtonPropControls';

interface UseToggleButtonProps {
  (initialValues: ToggleButtonProps): ToggleButtonPropControlsProps;
}

export const useToggleButtonProps: UseToggleButtonProps = (initialValues) => {
  const [isDisabled, setIsDisabled] = useState<ToggleButtonProps['isDisabled']>(
    initialValues.isDisabled
  );
  const [size, setSize] = useState<ToggleButtonProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = useState<ToggleButtonProps['variation']>(
    initialValues.variation
  );

  return {
    isDisabled,
    setIsDisabled,
    size,
    setSize,
    variation,
    setVariation,
  };
};
