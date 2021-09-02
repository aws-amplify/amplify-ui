import { TextFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FieldControl } from './GetFieldControls';

export type TextFieldDocsProps = Omit<TextFieldProps, '[key]'>;

interface UseTextFieldProps {
  (initialValues: TextFieldDocsProps): FieldControl[];
}

export const useTextFieldProps: UseTextFieldProps = (initialValues) => {
  return [
    [
      ...useState<TextFieldDocsProps['autoComplete']>(
        initialValues.autoComplete
      ),
      'autoComplete',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['defaultValue']>(
        initialValues.defaultValue
      ),
      'defaultValue',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['descriptiveText']>(
        initialValues.descriptiveText
      ),
      'descriptiveText',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['errorMessage']>(
        initialValues.errorMessage
      ),
      'errorMessage',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['hasError']>(initialValues.hasError),
      'hasError',
      'checkbox',
    ],
    [
      ...useState<TextFieldDocsProps['inputMode']>(initialValues.inputMode),
      'inputMode',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['isDisabled']>(initialValues.isDisabled),
      'isDisabled',
      'checkbox',
    ],
    [
      ...useState<TextFieldDocsProps['isReadOnly']>(initialValues.isReadOnly),
      'isReadOnly',
      'checkbox',
    ],
    [
      ...useState<TextFieldDocsProps['isRequired']>(initialValues.isRequired),
      'isRequired',
      'checkbox',
    ],
    [
      ...useState<TextFieldDocsProps['label']>(initialValues.label),
      'label',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['labelHidden']>(initialValues.labelHidden),
      'labelHidden',
      'checkbox',
    ],
    [
      ...useState<TextFieldDocsProps['name']>(initialValues.name),
      'name',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['placeholder']>(initialValues.placeholder),
      'placeholder',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['size']>(initialValues.size),
      'size',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['type']>(initialValues.type),
      'type',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['value']>(initialValues.value),
      'value',
      'text',
    ],
    [
      ...useState<TextFieldDocsProps['variation']>(initialValues.variation),
      'variation',
      'text',
    ],
  ];
};
