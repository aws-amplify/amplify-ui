import * as React from 'react';

import {
  TextField,
  Text,
  Flex,
  Button,
  View,
  FlexStyleProps,
  TextFieldProps,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { GetFieldControls } from '@/components/GetFieldControls';
import { useFlexStyleProps } from '@/components/useFlexStyleProps';
import { useTextFieldProps } from '@/components/useTextFieldProps';

export const TextFieldDemo = () => {
  const flexStyleProps = useFlexStyleProps({
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
              alignContent={alignContent as FlexStyleProps['alignContent']}
              alignItems={alignItems as FlexStyleProps['alignItems']}
              autoComplete={autoComplete as TextFieldProps['autoComplete']}
              descriptiveText={
                descriptiveText as TextFieldProps['descriptiveText']
              }
              defaultValue={defaultValue as TextFieldProps['defaultValue']}
              direction={direction as FlexStyleProps['direction']}
              errorMessage={errorMessage as TextFieldProps['errorMessage']}
              gap={gap as FlexStyleProps['gap']}
              hasError={hasError as unknown as boolean}
              inputMode={inputMode as TextFieldProps['inputMode']}
              isDisabled={isDisabled as unknown as boolean}
              isReadOnly={isReadOnly as unknown as boolean}
              isRequired={isRequired as unknown as boolean}
              justifyContent={
                justifyContent as FlexStyleProps['justifyContent']
              }
              label={label as TextFieldProps['label']}
              labelHidden={labelHidden as unknown as boolean}
              name={name as TextFieldProps['name']}
              placeholder={placeholder as TextFieldProps['placeholder']}
              size={size as TextFieldProps['size']}
              type={type as TextFieldProps['type']}
              value={value as TextFieldProps['value']}
              variation={variation as TextFieldProps['variation']}
              wrap={wrap as FlexStyleProps['wrap']}
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

export const DescriptiveTextFieldExample = () => {
  return (
    <View width="100%">
      <TextField
        type="password"
        label="Password"
        descriptiveText={
          <Text
            as="span"
            color="rebeccapurple"
            fontStyle="italic"
            fontSize="0.8rem"
          >
            Password length must be greater than 8 characters
            <input />
          </Text>
        }
      />
    </View>
  );
};

export const RequiredTextFieldExample = () => (
  <Flex as="form" direction="column" width="20rem">
    <TextField
      label={
        <Text>
          Email
          <Text as="span" fontSize="0.8rem" color="red">
            {' '}
            (required)
          </Text>
        </Text>
      }
      type="email"
      name="email"
      isRequired={true}
    />
    <TextField
      label="Password"
      descriptiveText={
        <Text as="span" fontSize="0.8rem" color="red" fontStyle="italic">
          Required
        </Text>
      }
      type="email"
      name="email"
      isRequired={true}
    />
    <Button type="submit">Submit</Button>
  </Flex>
);

export const TextFieldStyledPropsExample = () => (
  <TextField
    direction="row"
    alignItems="baseline"
    fontSize="1.5rem"
    label={
      <Text fontWeight="bold" fontSize="1.5rem">
        Name:
      </Text>
    }
    backgroundColor="#fff1e7"
    color="#000"
    width="400px"
  />
);

export const TextFieldStartEndComponentsExample = () => (
  <Flex gap="1rem" direction="column">
    <TextField label="Start" inputStartComponents={<Button>Start</Button>} />
    <TextField
      label="Start and End"
      inputStartComponents={<Button>Start</Button>}
      inputEndComponents={<Button>End</Button>}
    />
    <TextField label="End" inputEndComponents={<Button>End</Button>} />
    <TextField
      label="Multiple End"
      inputEndComponents={
        <>
          <Button>End</Button>
          <Button>End</Button>
        </>
      }
    />
    <TextField
      label="Multiple Start"
      inputStartComponents={
        <>
          <Button>Start</Button>
          <Button>Start</Button>
        </>
      }
    />
  </Flex>
);
