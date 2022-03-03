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
    isLabelHidden: false,
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
    [isLabelHidden],
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
                autoComplete={
                  autoComplete as TextFieldProps<false>['autoComplete']
                }
                descriptiveText={
                  descriptiveText as TextFieldProps<false>['descriptiveText']
                }
                defaultValue={
                  defaultValue as TextFieldProps<false>['defaultValue']
                }
                direction={direction as FlexContainerStyleProps['direction']}
                errorMessage={
                  errorMessage as TextFieldProps<false>['errorMessage']
                }
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
                placeholder={
                  placeholder as TextFieldProps<false>['placeholder']
                }
                size={size as TextFieldProps<false>['size']}
                variation={variation as TextFieldProps<false>['variation']}
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
