import { SearchFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';

import { SearchFieldPropControlsProps } from './SearchFieldPropControls';

interface UseSearchFieldFieldProps {
  (initialValues?: SearchFieldProps): SearchFieldPropControlsProps;
}

export const useSearchFieldProps: UseSearchFieldFieldProps = (
  initialValues
) => {
  const [isDisabled, setIsDisabled] = useState<SearchFieldProps['isDisabled']>(
    initialValues.isDisabled
  );
  const [label, setLabel] = useState<SearchFieldProps['label']>(
    initialValues.label
  );
  const [labelHidden, setLabelHidden] = useState<
    SearchFieldProps['labelHidden']
  >(initialValues.labelHidden);

  const [placeholder, setPlaceholder] = useState<
    SearchFieldProps['placeholder']
  >(initialValues.placeholder);
  const [size, setSize] = useState<SearchFieldProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = useState<SearchFieldProps['variation']>(
    initialValues.variation
  );

  return {
    isDisabled,
    setIsDisabled,
    label,
    setLabel,
    labelHidden,
    setLabelHidden,
    placeholder,
    setPlaceholder,
    size,
    setSize,
    variation,
    setVariation,
  };
};
