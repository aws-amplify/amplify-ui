import * as React from 'react';

import {
  FlexContainerStyleProps,
  PhoneNumberField,
  TextFieldProps,
  View,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { useTextFieldProps } from '../textfield/useTextFieldProps';
import { GetFieldControls } from '../shared/GetFieldControls';
import { useFlexContainerStyleProps } from '../shared/useFlexContainerStyleProps';

export const PhoneNumberFieldDemo = () => {
  const flexStyleProps = useFlexContainerStyleProps({
    alignItems: '',
    alignContent: '',
    direction: 'column',
    gap: '',
    justifyContent: '',
    wrap: 'nowrap',
  });
  const textFieldProps = useTextFieldProps({
    autoComplete: 'username',
    defaultValue: '',
    descriptiveText: 'Please enter your phone number',
    errorMessage: '',
    hasError: false,
    inputMode: 'text',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    label: 'Phone Number',
    isLabelHidden: false,
    name: 'phone_number',
    placeholder: 'Phone Number',
    size: '',
    type: null,
    variation: '',
    value: '',
  });
  const FlexPropControls = GetFieldControls({
    typeName: 'Flex',
    fields: flexStyleProps,
  });
  const TextFieldPropControls = GetFieldControls({
    typeName: 'PhoneNumberField',
    fields: textFieldProps,
  });

  const [
    [alignItems],
    [alignContent],
    [direction],
    [gap],
    [justifyContent],
    [wrap],
  ] = flexStyleProps;
  const [
    [autoComplete],
    [defaultValue],
    [descriptiveText],
    [errorMessage],
    [hasError],
    [inputMode],
    [isDisabled],
    [isReadOnly],
    [isRequired],
    [label],
    [isLabelHidden],
    [name],
    [placeholder],
    [size],
    [type],
    [value],
    [variation],
  ] = textFieldProps;

  return (
    <View width="100%">
      {TextFieldPropControls}
      {FlexPropControls}
      <Example>
        <PhoneNumberField
          defaultCountryCode="+1"
          alignContent={alignContent as FlexContainerStyleProps['alignContent']}
          alignItems={alignItems as FlexContainerStyleProps['alignItems']}
          autoComplete={autoComplete as TextFieldProps<false>['autoComplete']}
          descriptiveText={
            descriptiveText as TextFieldProps<false>['descriptiveText']
          }
          defaultValue={defaultValue as TextFieldProps<false>['defaultValue']}
          direction={direction as FlexContainerStyleProps['direction']}
          errorMessage={errorMessage as TextFieldProps<false>['errorMessage']}
          gap={gap as FlexContainerStyleProps['gap']}
          hasError={hasError as unknown as boolean}
          inputMode={inputMode as TextFieldProps<false>['inputMode']}
          isDisabled={isDisabled as unknown as boolean}
          isReadOnly={isReadOnly as unknown as boolean}
          isRequired={isRequired as unknown as boolean}
          justifyContent={
            justifyContent as FlexContainerStyleProps['justifyContent']
          }
          label={label as TextFieldProps<false>['label']}
          isLabelHidden={isLabelHidden as unknown as boolean}
          name={name as TextFieldProps<false>['name']}
          placeholder={placeholder as TextFieldProps<false>['placeholder']}
          size={size as TextFieldProps<false>['size']}
          variation={variation as TextFieldProps<false>['variation']}
          wrap={wrap as FlexContainerStyleProps['wrap']}
        />
      </Example>
    </View>
  );
};
