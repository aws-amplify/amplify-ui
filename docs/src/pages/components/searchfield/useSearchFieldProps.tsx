import * as React from 'react';
import { SearchFieldProps } from '@aws-amplify/ui-react';
import { SearchFieldPropControlsProps } from './SearchFieldPropControls';

interface UseSearchFieldFieldProps {
  (initialValues?: SearchFieldProps): SearchFieldPropControlsProps;
}

export const useSearchFieldProps: UseSearchFieldFieldProps = (
  initialValues
) => {
  const [label, setLabel] = React.useState<SearchFieldProps['label']>(
    initialValues.label
  );
  const [placeholder, setPlaceholder] = React.useState<
    SearchFieldProps['placeholder']
  >(initialValues.placeholder);
  const [size, setSize] = React.useState<SearchFieldProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<
    SearchFieldProps['variation']
  >(initialValues.variation);
  const [labelHidden, setLabelHidden] = React.useState<
    SearchFieldProps['labelHidden']
  >(initialValues.labelHidden);
  const [isDisabled, setIsDisabled] = React.useState<
    SearchFieldProps['isDisabled']
  >(initialValues.isDisabled);

  return {
    label,
    setLabel,
    placeholder,
    setPlaceholder,
    size,
    setSize,
    variation,
    setVariation,
    labelHidden,
    setLabelHidden,
    isDisabled,
    setIsDisabled,
  };
};
