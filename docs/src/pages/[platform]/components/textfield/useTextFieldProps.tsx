import { TextFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { FieldControl } from '../shared/GetFieldControls';

export type TextFieldDocsProps = Omit<TextFieldProps, '[key]'>;

interface UseTextFieldProps {
  (initialValues: TextFieldDocsProps): FieldControl[];
}

export const useTextFieldProps: UseTextFieldProps = (initialValues) => {
  return [
    [
      ...React.useState<TextFieldDocsProps['autoComplete']>(
        initialValues.autoComplete
      ),
      'autoComplete',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['defaultValue']>(
        initialValues.defaultValue
      ),
      'defaultValue',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['descriptiveText']>(
        initialValues.descriptiveText
      ),
      'descriptiveText',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['errorMessage']>(
        initialValues.errorMessage
      ),
      'errorMessage',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['hasError']>(initialValues.hasError),
      'hasError',
      'checkbox',
    ],
    [
      ...React.useState<TextFieldDocsProps['inputMode']>(
        initialValues.inputMode
      ),
      'inputMode',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['isDisabled']>(
        initialValues.isDisabled
      ),
      'isDisabled',
      'checkbox',
    ],
    [
      ...React.useState<TextFieldDocsProps['isReadOnly']>(
        initialValues.isReadOnly
      ),
      'isReadOnly',
      'checkbox',
    ],
    [
      ...React.useState<TextFieldDocsProps['isRequired']>(
        initialValues.isRequired
      ),
      'isRequired',
      'checkbox',
    ],
    [
      ...React.useState<TextFieldDocsProps['label']>(initialValues.label),
      'label',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['labelHidden']>(
        initialValues.labelHidden
      ),
      'labelHidden',
      'checkbox',
    ],
    [
      ...React.useState<TextFieldDocsProps['name']>(initialValues.name),
      'name',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['placeholder']>(
        initialValues.placeholder
      ),
      'placeholder',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['size']>(initialValues.size),
      'size',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['type']>(initialValues.type),
      'type',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['value']>(initialValues.value),
      'value',
      'text',
    ],
    [
      ...React.useState<TextFieldDocsProps['variation']>(
        initialValues.variation
      ),
      'variation',
      'text',
    ],
  ];
};
