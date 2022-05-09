import * as React from 'react';

import {
  Flex,
  FlexContainerStyleProps,
  PasswordField,
  PasswordFieldProps,
  TextFieldProps,
  View,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { usePasswordFieldProps } from '@/components/usePasswordFieldProps';
import { GetFieldControls } from '../shared/GetFieldControls';
import { useFlexContainerStyleProps } from '../shared/useFlexContainerStyleProps';

export const PasswordFieldDemo = () => {
  const flexStyleProps = useFlexContainerStyleProps({
    alignItems: '',
    alignContent: '',
    direction: 'column',
    gap: '',
    justifyContent: '',
    wrap: 'nowrap',
  });
  const textFieldProps = usePasswordFieldProps({
    autoComplete: 'new-password',
    defaultValue: '',
    descriptiveText: 'Please enter password with at least 8 characters',
    errorMessage: '',
    hasError: false,
    inputMode: 'text',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    label: 'Password',
    labelHidden: false,
    name: 'password',
    placeholder: '',
    size: '',
    type: null,
    value: undefined,
    variation: '',
    hideShowPassword: false,
  });
  const FlexPropControls = GetFieldControls({
    typeName: 'Flex',
    fields: flexStyleProps,
  });
  const TextFieldPropControls = GetFieldControls({
    typeName: 'PasswordField',
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
    [labelHidden],
    [name],
    [placeholder],
    [size],
    [type],
    [value],
    [variation],
    [hideShowPassword],
  ] = textFieldProps;
  return (
    <View width="100%">
      {TextFieldPropControls}
      {FlexPropControls}
      <Example>
        <View maxWidth="500px" padding="2rem">
          <Flex gap="2rem" direction="column">
            <form>
              <input
                autoComplete="username"
                name="username"
                defaultValue="me@email.com"
                type="hidden"
              />
              <PasswordField
                alignContent={
                  alignContent as FlexContainerStyleProps['alignContent']
                }
                alignItems={alignItems as FlexContainerStyleProps['alignItems']}
                autoComplete={autoComplete as TextFieldProps['autoComplete']}
                descriptiveText={
                  descriptiveText as TextFieldProps['descriptiveText']
                }
                defaultValue={defaultValue as TextFieldProps['defaultValue']}
                direction={direction as FlexContainerStyleProps['direction']}
                errorMessage={errorMessage as TextFieldProps['errorMessage']}
                gap={gap as FlexContainerStyleProps['gap']}
                hasError={hasError as unknown as boolean}
                inputMode={inputMode as TextFieldProps['inputMode']}
                isDisabled={isDisabled as unknown as boolean}
                isReadOnly={isReadOnly as unknown as boolean}
                isRequired={isRequired as unknown as boolean}
                justifyContent={
                  justifyContent as FlexContainerStyleProps['justifyContent']
                }
                label={label as TextFieldProps['label']}
                labelHidden={labelHidden as unknown as boolean}
                name={name as TextFieldProps['name']}
                placeholder={placeholder as TextFieldProps['placeholder']}
                size={size as TextFieldProps['size']}
                variation={variation as TextFieldProps['variation']}
                wrap={wrap as FlexContainerStyleProps['wrap']}
                hideShowPassword={
                  hideShowPassword as unknown as PasswordFieldProps['hideShowPassword']
                }
              />
            </form>
          </Flex>
        </View>
      </Example>
    </View>
  );
};
