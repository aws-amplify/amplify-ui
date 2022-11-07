import React from 'react';

import { Logger } from 'aws-amplify';
import {
  changePassword,
  confirmPasswordMatch,
  getDefaultPasswordValidator,
  getPasswordSettings,
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
import { getIsDisabled } from './utils';

const logger = new Logger('ChangePassword');

function ChangePassword({
  onSuccess,
  onError,
  validate,
}: ChangePasswordProps): JSX.Element | null {
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [blurredFields, setBlurredFields] = React.useState<BlurredFields>({});
  const [validationError, setValidationError] = React.useState<ValidationError>(
    {}
  );

  const { user, isLoading } = useAuth();

  const isDisabled = getIsDisabled(formValues, validationError);

  const defaultValidator = React.useMemo(() => {
    const passwordSettings = getPasswordSettings();
    return getDefaultPasswordValidator(passwordSettings);
  }, []);

  /** Validator */
  const passwordValidator = React.useMemo(
    () => validate ?? defaultValidator,
    [validate, defaultValidator]
  );

  const validateNewPassword = (
    formValues: FormValues,
    blurredFields: BlurredFields
  ): string[] => {
    const { newPassword } = formValues;
    // return if field isn't filled out or hasn't been blurred yet
    if (!newPassword || !blurredFields.newPassword) return;

    return passwordValidator(newPassword);
  };

  const validateConfirmPassword = (formValues: FormValues): string[] => {
    const { newPassword, confirmPassword } = formValues;

    // return if newPassword isn't filled out or hasn't been blurred yet
    if (!newPassword || !confirmPassword) return;

    const error = confirmPasswordMatch(newPassword, confirmPassword);
    const errors = error ? [error] : null;

    return errors;
  };

  const runValidation = (
    formValues: FormValues,
    blurredFields: BlurredFields
  ) => {
    const newPasswordErrors = validateNewPassword(formValues, blurredFields);
    const confirmPasswordErrors = validateConfirmPassword(formValues);

    setValidationError({
      newPassword: newPasswordErrors,
      confirmPassword: confirmPasswordErrors,
    });
  };

  /** Translations */
  // TODO: add AccountSettingsTextUtil to collect these strings
  const currentPasswordLabel = translate('Current Password');
  const newPasswordLabel = translate('New Password');
  const confirmPasswordLabel = translate('Confirm Password');
  const updatePasswordText = translate('Update password');

  /** Event Handlers */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    const newFormValues = { ...formValues, [name]: value };
    runValidation(newFormValues, blurredFields);

    setFormValues(newFormValues);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name } = event.target;
    const newBlurredFields = { ...blurredFields, [name]: true };
    runValidation(formValues, newBlurredFields);
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

  /** Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isLoading) {
    return null;
  }

  /** Return null if user isn't authenticated in the first place */
  if (!user) {
    logger.warn('<ChangePassword /> requires user to be authenticated.');
    return null;
  }

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
          validationErrors={validationError?.newPassword}
        />
        <DefaultNewPassword
          autoComplete="new-password"
          isRequired
          label={confirmPasswordLabel}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          validationErrors={validationError?.confirmPassword}
        />
        <DefaultSubmitButton isDisabled={isDisabled} type="submit">
          {updatePasswordText}
        </DefaultSubmitButton>
        {errorMessage ? <DefaultError>{errorMessage}</DefaultError> : null}
      </Flex>
    </View>
  );
}

export default ChangePassword;
