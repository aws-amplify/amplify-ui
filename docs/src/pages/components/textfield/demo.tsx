import * as React from 'react';

import {
  TextField,
  Flex,
  View,
  FlexContainerStyleProps,
  TextFieldProps,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { GetFieldControls } from '@/components/GetFieldControls';
import { useFlexContainerStyleProps } from '@/components/useFlexContainerStyleProps';
import { useTextFieldProps } from '@/components/useTextFieldProps';

export const TextFieldDemo = () => {
  const flexStyleProps = useFlexContainerStyleProps({
    alignItems: '',
    alignContent: '',
    direction: 'column',
    gap: '',
    justifyContent: '',
    wrap: 'nowrap',
  });
  const textFieldProps = useTextFieldProps({
    autoComplete: 'off',
    defaultValue: null,
    descriptiveText: 'Enter a valid last name',
    errorMessage: '',
    hasError: false,
    inputMode: 'text',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    label: 'Last name',
    labelHidden: false,
    name: 'last_name',
    placeholder: 'Baggins',
    size: '',
    type: 'text',
    value: null,
    variation: '',
  });
  const FlexPropControls = GetFieldControls({
    typeName: 'Flex',
    fields: flexStyleProps,
  });
  const TextFieldPropControls = GetFieldControls({
    typeName: 'TextField',
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
      <Example>
        <View maxWidth="500px" padding="2rem">
          <Flex gap="2rem" direction="column">
            <TextField
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
              type={type as TextFieldProps['type']}
              value={value as TextFieldProps['value']}
              variation={variation as TextFieldProps['variation']}
              wrap={wrap as FlexContainerStyleProps['wrap']}
              onChange={(e) => console.info(e.currentTarget.value)}
              onInput={(e) =>
                console.info('input fired:', e.currentTarget.value)
              }
              onCopy={(e) =>
                console.info('onCopy fired:', e.currentTarget.value)
              }
              onCut={(e) => console.info('onCut fired:', e.currentTarget.value)}
              onPaste={(e) =>
                console.info('onPaste fired:', e.currentTarget.value)
              }
              onSelect={(e) =>
                console.info(
                  'onSelect fired:',
                  e.currentTarget.value.substring(
                    e.currentTarget.selectionStart,
                    e.currentTarget.selectionEnd
                  )
                )
              }
            />
          </Flex>
        </View>
      </Example>
    </View>
  );
};
