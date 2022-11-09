import React from 'react';
import isEqual from 'lodash/isEqual';

import { Logger } from 'aws-amplify';
import {
  changePassword,
  ValidatorSpec,
  InputEventType,
  getDefaultConfirmPasswordValidators,
  getDefaultPasswordValidators,
  runFieldValidators,
  translate,
} from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Flex } from '../../../primitives';
import { FormValues, BlurredFields, ValidationError } from '../types';
import {
  DefaultConfirmPassword,
  DefaultCurrentPassword,
  DefaultError,
  DefaultNewPassword,
  DefaultSubmitButton,
} from './defaultComponents';
import { ChangePasswordProps } from './types';

const logger = new Logger('ChangePassword');

const getIsDisabled = (
  formValues: FormValues,
  validationError: ValidationError
): boolean => {
  const { currentPassword, newPassword, confirmPassword } = formValues;

  const hasEmptyField = !currentPassword || !newPassword || !confirmPassword;

  const arePasswordsInvalid =
    validationError.newPassword?.length > 0 ||
    validationError.confirmPassword?.length > 0;

  return hasEmptyField || arePasswordsInvalid;
};

function ChangePassword({
  onSuccess,
  onError,
  validators,
}: ChangePasswordProps): JSX.Element | null {
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [blurredFields, setBlurredFields] = React.useState<BlurredFields>({});
  const [validationError, setValidationError] = React.useState<ValidationError>(
    {}
  );
  const { user, isLoading } = useAuth();

  const isDisabled = getIsDisabled(formValues, validationError);

  const passwordValidators: ValidatorSpec[] = React.useMemo(() => {
    return validators ?? getDefaultPasswordValidators();
  }, [validators]);

  /*
   * Note that formValues and other states are passed in as props so that
   * it does not depend on whether or not those states have been updated yet
   */
  const validateNewPassword = React.useCallback(
    (
      formValues: FormValues,
      blurredFields: BlurredFields,
      eventType: InputEventType
    ): string[] => {
      const { newPassword } = formValues;

      return runFieldValidators({
        value: newPassword,
        validators: passwordValidators,
        eventType,
        hasBlurred: blurredFields.newPassword,
      });
    },
    [passwordValidators]
  );

  const validateConfirmPassword = React.useCallback(
    (
      formValues: FormValues,
      blurredFields: BlurredFields,
      eventType: InputEventType
    ): string[] => {
      const { newPassword, confirmPassword } = formValues;

      const confirmPasswordValidators =
        getDefaultConfirmPasswordValidators(newPassword);

      return runFieldValidators({
        value: confirmPassword,
        validators: confirmPasswordValidators,
        eventType,
        hasBlurred: blurredFields.confirmPassword,
      });
    },
    []
  );

  const runValidation = React.useCallback(
    (
      formValues: FormValues,
      blurredFields: BlurredFields,
      eventType: InputEventType
    ) => {
      const passwordErrors = validateNewPassword(
        formValues,
        blurredFields,
        eventType
      );
      const confirmPasswordErrors = validateConfirmPassword(
        formValues,
        blurredFields,
        eventType
      );

      const newValidationError = {
        newPassword: passwordErrors,
        confirmPassword: confirmPasswordErrors,
      };

      // only re-render if errors have changed
      if (!isEqual(validationError, newValidationError)) {
        setValidationError(newValidationError);
      }
    },
    [validateConfirmPassword, validateNewPassword, validationError]
  );

  /* Translations */
  // TODO: add AccountSettingsTextUtil to collect these strings
  const currentPasswordLabel = translate('Current Password');
  const newPasswordLabel = translate('New Password');
  const confirmPasswordLabel = translate('Confirm Password');
  const updatePasswordText = translate('Update password');

  /* Event Handlers */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    const newFormValues = { ...formValues, [name]: value };
    runValidation(newFormValues, blurredFields, 'change');

    setFormValues(newFormValues);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name } = event.target;
    // only update state and run validation if this is the first time blurring the field
    if (!blurredFields[name]) {
      const newBlurredFields = { ...blurredFields, [name]: true };
      runValidation(formValues, newBlurredFields, 'blur');
      setBlurredFields(newBlurredFields);
    }
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

  // Return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isLoading) {
    return null;
  }

  // Return null if user isn't authenticated in the first place
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
        <DefaultConfirmPassword
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
