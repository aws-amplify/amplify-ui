import * as React from 'react';

import {
  FlexStyleProps,
  PhoneNumberField,
  TextFieldProps,
  View,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { GetFieldControls } from '@/components/GetFieldControls';
import { useFlexStyleProps } from '@/components/useFlexStyleProps';
import { useTextFieldProps } from '@/components/useTextFieldProps';

export const PhoneNumberFieldDemo = () => {
  const flexStyleProps = useFlexStyleProps({
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
    labelHidden: false,
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
    [defaultValue], // leave unused `defaultValue` since destructuring order is important
    [descriptiveText],
    [errorMessage],
    [hasError],
    [inputMode],
    [isDisabled],
    [isReadOnly],
    [isRequired],
    [label],
    [labelHidden],
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
      <Example className="">
        <PhoneNumberField
          defaultCountryCode="+1"
          alignContent={alignContent as FlexStyleProps['alignContent']}
          alignItems={alignItems as FlexStyleProps['alignItems']}
          autoComplete={autoComplete as TextFieldProps['autoComplete']}
          descriptiveText={descriptiveText as TextFieldProps['descriptiveText']}
          defaultValue={defaultValue as TextFieldProps['defaultValue']}
          direction={direction as FlexStyleProps['direction']}
          errorMessage={errorMessage as TextFieldProps['errorMessage']}
          gap={gap as FlexStyleProps['gap']}
          hasError={hasError as unknown as boolean}
          inputMode={inputMode as TextFieldProps['inputMode']}
          isDisabled={isDisabled as unknown as boolean}
          isReadOnly={isReadOnly as unknown as boolean}
          isRequired={isRequired as unknown as boolean}
          justifyContent={justifyContent as FlexStyleProps['justifyContent']}
          label={label as TextFieldProps['label']}
          labelHidden={labelHidden as unknown as boolean}
          name={name as TextFieldProps['name']}
          placeholder={placeholder as TextFieldProps['placeholder']}
          size={size as TextFieldProps['size']}
          variation={variation as TextFieldProps['variation']}
          wrap={wrap as FlexStyleProps['wrap']}
        />
      </Example>
    </View>
  );
};
