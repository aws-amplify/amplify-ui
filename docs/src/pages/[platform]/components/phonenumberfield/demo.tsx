import * as React from 'react';
import { PhoneNumberField, PhoneNumberFieldProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { PhoneNumberFieldPropControls } from './PhoneNumberFieldPropControls';
import { usePhoneNumberFieldProps } from './usePhoneNumberFieldProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = (props) => {
  return (
    `<PhoneNumberField` +
    `\n  defaultDialCode="${props.defaultDialCode}"` +
    `\n  label="${props.label}"` +
    (props.labelHidden ? `\n  labelHidden` : '') +
    getPropString(props.descriptiveText, 'descriptiveText') +
    getPropString(props.placeholder, 'placeholder') +
    getPropString(props.size, 'size') +
    getPropString(props.variation, 'variation') +
    getPropString(props.errorMessage, 'errorMessage') +
    (props.hasError ? `\n  hasError` : '') +
    (props.isDisabled ? `\n  isDisabled` : '') +
    (props.isReadOnly ? `\n  isReadOnly` : '') +
    `\n/>`
  );
};

const defaultPhoneNumberFieldProps: PhoneNumberFieldProps = {
  defaultDialCode: '+1',
  label: 'Phone number',
  value: '',
  descriptiveText: 'Please enter your phone number',
  placeholder: '234-567-8910',
  errorMessage: '',
  labelHidden: false,
  hasError: false,
  isDisabled: false,
  isReadOnly: false,
};

export const PhoneNumberFieldDemo = () => {
  const phoneNumberFieldProps = usePhoneNumberFieldProps(
    (demoState.get(PhoneNumberField.displayName) as PhoneNumberFieldProps) ||
      defaultPhoneNumberFieldProps
  );

  return (
    <Demo
      code={propsToCode(phoneNumberFieldProps)}
      propControls={<PhoneNumberFieldPropControls {...phoneNumberFieldProps} />}
    >
      <PhoneNumberField
        value={phoneNumberFieldProps.value}
        onChange={(event) => phoneNumberFieldProps.setValue(event.target.value)}
        defaultDialCode={phoneNumberFieldProps.defaultDialCode}
        onDialCodeChange={(event) =>
          phoneNumberFieldProps.setDefaultDialCode(event.target.value)
        }
        label={phoneNumberFieldProps.label}
        labelHidden={phoneNumberFieldProps.labelHidden}
        descriptiveText={phoneNumberFieldProps.descriptiveText}
        placeholder={phoneNumberFieldProps.placeholder}
        size={phoneNumberFieldProps.size}
        variation={phoneNumberFieldProps.variation}
        errorMessage={phoneNumberFieldProps.errorMessage}
        hasError={phoneNumberFieldProps.hasError}
        isDisabled={phoneNumberFieldProps.isDisabled}
        isReadOnly={phoneNumberFieldProps.isReadOnly}
      />
    </Demo>
  );
};
