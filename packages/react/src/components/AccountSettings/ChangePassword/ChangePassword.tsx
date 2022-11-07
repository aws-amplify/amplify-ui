import React from 'react';

import { Logger } from 'aws-amplify';
import {
  changePassword,
  confirmPasswordMatch,
  FieldValidator,
  getDefaultPasswordValidator,
  translate,
} from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Flex } from '../../../primitives';
import {
  DefaultCurrentPassword,
  DefaultError,
  DefaultNewPassword,
  DefaultSubmitButton,
} from './defaultComponents';
import { ChangePasswordProps } from './types';
import { FormValues, BlurredFields, ValidationError } from '../types';

const logger = new Logger('ChangePassword');

function ChangePassword({
  onSuccess,
  onError,
  validate,
}: ChangePasswordProps): JSX.Element | null {
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [blurredFields, setBlurredFields] = React.useState<BlurredFields>({});
  const [_validationError, setValidationError] =
    React.useState<ValidationError>({});

  const { user, isLoading } = useAuth();

  /** Validator */
  const defaultValidators = React.useMemo(
    () => getDefaultPasswordValidator(),
    []
  );

  const passwordValidators: FieldValidator[] = React.useMemo(
    () => validate ?? defaultValidators,
    [validate, defaultValidators]
  );

  const validateNewPassword = (newPassword: string): string[] => {
    // return if field isn't filled out or hasn't been blurred yet
    if (!newPassword || !blurredFields[newPassword]) return;

    const errors: string[] = [];
    passwordValidators.forEach((validator) => {
      const error = validator(newPassword);
      if (error) {
        errors.push(error);
      }
    });
    return errors;
  };

  const validateConfirmPassword = (
    newPassword: string,
    confirmPassword: string
  ): string[] => {
    // return if newPassword isn't filled out or hasn't been blurred yet
    if (!newPassword || !blurredFields[newPassword]) return;
    // return if confirmPassword isn't filled out or hasn't been blurred yet
    if (!confirmPassword || !blurredFields[confirmPassword]) return;

    const error = confirmPasswordMatch(newPassword, confirmPassword);
    return error ? [error] : null;
  };

  const validateFields = (formValues: FormValues): void => {
    const { newPassword, confirmPassword } = formValues;

    // new password validation
    const newPasswordErrors = validateNewPassword(newPassword);

    // confirm password validation
    const confirmPasswordErrors = validateConfirmPassword(
      newPassword,
      confirmPassword
    );

    if (newPasswordErrors?.length >= 0 && confirmPasswordErrors?.length >= 0) {
      setValidationError({
        newPassword: newPasswordErrors,
        confirmPassword: confirmPasswordErrors,
      });
    }
  };

  /** Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isLoading) {
    return null;
  }

  /** Return null if user isn't authenticated in the first place */
  if (!user) {
    logger.warn('<ChangePassword /> requires user to be authenticated.');
    return null;
  }

  /** Translations */
  // TODO: add AccountSettingsTextUtil to collect these strings
  const currentPasswordLabel = translate('Current Password');
  const newPasswordLabel = translate('New Password');
  const updatePasswordText = translate('Update password');

  /** Event Handlers */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    const newFormValues = { ...formValues, [name]: value };
    validateFields(newFormValues);
    setFormValues(newFormValues);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name } = event.target;
    setBlurredFields({ ...blurredFields, [name]: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { currentPassword, newPassword } = formValues;
    if (errorMessage) {
      setErrorMessage(null);
    }
    try {
      await changePassword({ user, currentPassword, newPassword });

      onSuccess?.(); // notify success to the parent
    } catch (e) {
      const error = e as Error;
      if (error.message) setErrorMessage(error.message);

      onError?.(error); // notify error to the parent
    }
  };

  return (
    <View as="form" className="amplify-changepassword" onSubmit={handleSubmit}>
      <Flex direction="column">
        <DefaultCurrentPassword
          autoComplete="current-password"
          isRequired
          label={currentPasswordLabel}
          name="currentPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <DefaultNewPassword
          autoComplete="new-password"
          isRequired
          label={newPasswordLabel}
          name="newPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <DefaultSubmitButton type="submit">
          {updatePasswordText}
        </DefaultSubmitButton>
        {errorMessage ? <DefaultError>{errorMessage}</DefaultError> : null}
      </Flex>
    </View>
  );
}

export default ChangePassword;
