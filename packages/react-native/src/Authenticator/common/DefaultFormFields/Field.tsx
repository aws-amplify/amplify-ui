import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';
import { platform } from '../../../utils';
import { FieldProps } from './types';

const { IS_IOS } = platform;

// to prevent issues with iOS when multiple `TextInput` components have `secureTextEntry`
// set to `true`, insert a "hidden" `TextInput` after each `PasswordField`
// Issue reference: https://github.com/facebook/react-native/issues/21911
const HIDDEN_INPUT_PROPS: TextInputProps = {
  // prevent iOS screen reader from picking up element
  accessibilityElementsHidden: true,
  // prevent `TextInput` from capturing touch events
  pointerEvents: 'none',
  // this workaround requires the `height` and `width` applied to the `TextInput`
  // are greater than `0`
  // NOTE: do not attempt to set an opacity value here to further hide the element,
  // it will cause the issues mitigated by this workaround to re-surface
  style: { backgroundColor: 'transparent', height: 0.1, width: 0.1 },
};

const HiddenInput = () => <TextInput {...HIDDEN_INPUT_PROPS} />;

const Field = ({ type, ...rest }: FieldProps): JSX.Element => {
  const isPassword = type === 'password';
  const Field = isPassword
    ? PasswordField
    : type === 'phone'
    ? PhoneNumberField
    : TextField;

  return IS_IOS && isPassword ? (
    <>
      <Field {...rest} />
      <HiddenInput />
    </>
  ) : (
    <Field {...rest} />
  );
};

Field.displayName = 'Field';
export default Field;
