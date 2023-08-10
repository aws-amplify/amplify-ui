import * as React from 'react';

import { TextAreaField, BaseTextAreaFieldProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { useTextAreaFieldProps } from './useTextAreaFieldProps';
import { TextAreaFieldPropControls } from './TextAreaFieldPropControls';

export const TextAreaFieldDemo = () => {
  const textFieldProps = useTextAreaFieldProps({
    descriptiveText: 'Enter a valid last name',
    errorMessage: '',
    hasError: false,
    isDisabled: false,
    label: 'Last name',
    labelHidden: false,
    name: 'last_name',
    placeholder: 'Baggins',
    rows: 3,
    size: null,
    variation: null,
  });

  const {
    hasError,
    label,
    descriptiveText,
    errorMessage,
    isDisabled,
    isReadOnly,
    labelHidden,
    placeholder,
    size,
    rows,
    name,
    variation,
  } = textFieldProps;

  const code =
    `<TextAreaField` +
    (descriptiveText
      ? `
  descriptiveText="${descriptiveText}"`
      : '') +
    (errorMessage
      ? `
  errorMessage="${errorMessage}"`
      : '') +
    (hasError
      ? `
  hasError={${hasError}}`
      : '') +
    (isDisabled
      ? `
  isDisabled={${isDisabled}}`
      : '') +
    (isReadOnly
      ? `
  isReadOnly={${isReadOnly}}`
      : '') +
    (labelHidden
      ? `
  labelHidden={${labelHidden}}`
      : '') +
    `
  label="${label}"
  name="${name}"
  placeholder="${placeholder}"` +
    (rows
      ? `
  rows={${rows}}`
      : '') +
    (size
      ? `
  size="${size}"`
      : '') +
    (variation
      ? `
  variation="${variation}"`
      : '') +
    `/>`;

  return (
    <Demo
      code={code}
      propControls={<TextAreaFieldPropControls {...textFieldProps} />}
    >
      <TextAreaField
        descriptiveText={
          descriptiveText as BaseTextAreaFieldProps['descriptiveText']
        }
        errorMessage={errorMessage as BaseTextAreaFieldProps['errorMessage']}
        hasError={hasError as unknown as boolean}
        isDisabled={isDisabled as unknown as boolean}
        isReadOnly={isReadOnly as unknown as boolean}
        label={label as BaseTextAreaFieldProps['label']}
        labelHidden={labelHidden as unknown as boolean}
        name={name as BaseTextAreaFieldProps['name']}
        placeholder={placeholder as BaseTextAreaFieldProps['placeholder']}
        rows={rows as BaseTextAreaFieldProps['rows']}
        size={size as BaseTextAreaFieldProps['size']}
        variation={variation as BaseTextAreaFieldProps['variation']}
      />
    </Demo>
  );
};
