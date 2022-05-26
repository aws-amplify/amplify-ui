import * as React from 'react';

import {
  TextField,
  Flex,
  FlexContainerStyleProps,
  TextFieldProps,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { useTextFieldProps } from './useTextFieldProps';
import { GetFieldControls } from '../shared/GetFieldControls';
import { useFlexContainerStyleProps } from '../shared/useFlexContainerStyleProps';

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

  const code =
    `<TextField` +
    (alignContent
      ? `
  alignContent={${alignContent}}`
      : '') +
    (alignItems
      ? `
    alignItems={${alignItems}}`
      : '') +
    `
  autoComplete="${autoComplete}"
  descriptiveText="${descriptiveText}"` +
    (defaultValue
      ? `
  defaultValue="${defaultValue}"`
      : '') +
    `
  direction="${direction}"` +
    (errorMessage
      ? `
  errorMessage="${errorMessage}"`
      : '') +
    (gap
      ? `
  gap="${gap}"`
      : '') +
    `
  hasError={${hasError}}
  inputMode="${inputMode}"
  isDisabled={${isDisabled}}
  isReadOnly={${isReadOnly}}
  isRequired={${isRequired}}` +
    (justifyContent
      ? `
  justifyContent={${justifyContent}}`
      : '') +
    `
  label="${label}"
  labelHidden={${labelHidden}}
  name="${name}"
  placeholder="${placeholder}"` +
    (size
      ? `
  size="${size}"`
      : '') +
    `
  type="${type}"` +
    (value
      ? `
  value="${value}"`
      : '') +
    (variation
      ? `
  variation="${variation}"`
      : '') +
    `
  wrap="${wrap}"
  onChange={(e) => console.info(e.currentTarget.value)}
  onInput={(e) => console.info('input fired:', e.currentTarget.value)}
  onCopy={(e) => console.info('onCopy fired:', e.currentTarget.value)}
  onCut={(e) => console.info('onCut fired:', e.currentTarget.value)}
  onPaste={(e) => console.info('onPaste fired:', e.currentTarget.value)}
  onSelect={(e) =>
    console.info(
      'onSelect fired:',
      e.currentTarget.value.substring(
        e.currentTarget.selectionStart,
        e.currentTarget.selectionEnd
      )
    )
  }
/>`;

  return (
    <Demo
      code={code}
      propControls={
        <Flex direction="column">
          {TextFieldPropControls}
          {FlexPropControls}
        </Flex>
      }
    >
      <TextField
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
        labelHidden={labelHidden as unknown as boolean}
        name={name as TextFieldProps<false>['name']}
        placeholder={placeholder as TextFieldProps<false>['placeholder']}
        size={size as TextFieldProps<false>['size']}
        type={type as TextFieldProps<false>['type']}
        value={value as TextFieldProps<false>['value']}
        variation={variation as TextFieldProps<false>['variation']}
        wrap={wrap as FlexContainerStyleProps['wrap']}
        onChange={(e) => console.info(e.currentTarget.value)}
        onInput={(e) => console.info('input fired:', e.currentTarget.value)}
        onCopy={(e) => console.info('onCopy fired:', e.currentTarget.value)}
        onCut={(e) => console.info('onCut fired:', e.currentTarget.value)}
        onPaste={(e) => console.info('onPaste fired:', e.currentTarget.value)}
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
    </Demo>
  );
};
