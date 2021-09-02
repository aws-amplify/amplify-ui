import { SelectProps } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { SelectPropContorlsProps } from './SelectPropControls';

interface UseSelectProps {
  (initialValues?: SelectProps): SelectPropContorlsProps;
}

export const useSelectProps: UseSelectProps = (initialValues) => {
  const [size, setSize] = useState<SelectProps['size']>(initialValues.size);
  const [variation, setVariation] = useState<SelectProps['variation']>(
    initialValues.variation
  );
  const [isDisabled, setIsDisabled] = useState<SelectProps['isDisabled']>(
    initialValues.isDisabled
  );
  return {
    size,
    variation,
    isDisabled,
    setSize,
    setVariation,
    setIsDisabled,
  };
};
