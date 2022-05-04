import * as React from 'react';
import { ToggleButton, ToggleButtonProps } from '@aws-amplify/ui-react';

import { ToggleButtonPropControlsProps } from './ToggleButtonPropControls';
import { demoState } from '@/utils/demoState';

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

  React.useEffect(() => {
    demoState.set(ToggleButton.displayName, { isDisabled, size, variation });
  }, [isDisabled, size, variation]);

  return React.useMemo(
    () => ({
      isDisabled,
      setIsDisabled,
      size,
      setSize,
      variation,
      setVariation,
    }),
    [isDisabled, setIsDisabled, size, setSize, variation, setVariation]
  );
};
