import * as React from 'react';
import { Autocomplete, AutocompleteProps } from '@aws-amplify/ui-react';

import { AutocompletePropControlsProps } from './AutocompletePropControls';
import { demoState } from '@/utils/demoState';

interface UseAutocompleteProps {
  (initialValues?: AutocompleteProps): AutocompletePropControlsProps;
}

export const useAutocompleteProps: UseAutocompleteProps = (initialValues) => {
  const [isDisabled, setIsDisabled] = React.useState<
    AutocompleteProps['isDisabled']
  >(initialValues.isDisabled);
  const [isLoading, setIsLoading] = React.useState<
    AutocompleteProps['isLoading']
  >(initialValues.isLoading);
  const [label, setLabel] = React.useState<AutocompleteProps['label']>(
    initialValues.label
  );
  const [labelHidden, setLabelHidden] = React.useState<
    AutocompleteProps['labelHidden']
  >(initialValues.labelHidden);
  const [options, setOptions] = React.useState<AutocompleteProps['options']>(
    initialValues.options
  );
  const [placeholder, setPlaceholder] = React.useState<
    AutocompleteProps['placeholder']
  >(initialValues.placeholder);
  const [size, setSize] = React.useState<AutocompleteProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<
    AutocompleteProps['variation']
  >(initialValues.variation);

  React.useEffect(() => {
    demoState.set(Autocomplete.displayName, {
      isDisabled,
      label,
      labelHidden,
      options,
      placeholder,
      size,
      variation,
    });
  }, [isDisabled, label, labelHidden, options, placeholder, size, variation]);

  return React.useMemo(
    () => ({
      isDisabled,
      setIsDisabled,
      isLoading,
      setIsLoading,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      options,
      setOptions,
      placeholder,
      setPlaceholder,
      size,
      setSize,
      variation,
      setVariation,
    }),
    [
      isDisabled,
      setIsDisabled,
      isLoading,
      setIsLoading,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      options,
      setOptions,
      placeholder,
      setPlaceholder,
      size,
      setSize,
      variation,
      setVariation,
    ]
  );
};
