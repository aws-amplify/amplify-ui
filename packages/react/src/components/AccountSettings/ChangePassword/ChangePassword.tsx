import React from 'react';
import isEqual from 'lodash/isEqual';

import { Logger } from 'aws-amplify';
import {
  changePassword,
  ValidatorOptions,
  getDefaultConfirmPasswordValidators,
  getDefaultPasswordValidators,
  runFieldValidators,
  translate,
} from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Flex } from '../../../primitives';
import { ComponentClassName } from '../constants';
import { FormValues, BlurredFields, ValidationError } from '../types';
import { ChangePasswordProps, ValidateParams } from './types';
import DEFAULTS from './defaults';

const logger = new Logger('ChangePassword');

const getIsDisabled = (
  formValues: FormValues,
  validationError: ValidationError
): boolean => {
  const { currentPassword, newPassword, confirmPassword } = formValues;

  const hasEmptyField = !currentPassword || !newPassword || !confirmPassword;
  if (hasEmptyField) {
    return true;
  }

  const arePasswordsInvalid =
    validationError.newPassword?.length > 0 ||
    validationError.confirmPassword?.length > 0;

  return arePasswordsInvalid;
};

function ChangePassword({
  onSuccess,
  onError,
  validators,
  components,
}: ChangePasswordProps): JSX.Element | null {
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [validationError, setValidationError] = React.useState<ValidationError>(
    {}
  );
  const blurredFields = React.useRef<BlurredFields>([]);
  const { user, isLoading } = useAuth();

  const isDisabled = getIsDisabled(formValues, validationError);

  const passwordValidators: ValidatorOptions[] = React.useMemo(() => {
    return validators ?? getDefaultPasswordValidators();
  }, [validators]);

  /*
   * Note that formValues and other states are passed in as props so that
   * it does not depend on whether or not those states have been updated yet
   */
  const validateNewPassword = React.useCallback(
    ({ formValues, eventType }: ValidateParams): string[] => {
      const { newPassword } = formValues;
      const hasBlurred = blurredFields.current.includes('newPassword');

      return runFieldValidators({
        value: newPassword,
        validators: passwordValidators,
        eventType,
        hasBlurred,
      });
    },
    [passwordValidators]
  );

  const validateConfirmPassword = React.useCallback(
    ({ formValues, eventType }: ValidateParams): string[] => {
      const { newPassword, confirmPassword } = formValues;
      const hasBlurred = blurredFields.current.includes('confirmPassword');

      const confirmPasswordValidators =
        getDefaultConfirmPasswordValidators(newPassword);

      return runFieldValidators({
        value: confirmPassword,
        validators: confirmPasswordValidators,
        eventType,
        hasBlurred,
      });
    },
    []
  );

  const runValidation = React.useCallback(
    (param: ValidateParams) => {
      const passwordErrors = validateNewPassword(param);
      const confirmPasswordErrors = validateConfirmPassword(param);

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

  /* Subcomponents */
  const {
    CurrentPasswordField,
    NewPasswordField,
    ConfirmPasswordField,
    SubmitButton,
    ErrorMessage,
  } = React.useMemo(
    () => ({ ...DEFAULTS, ...(components ?? {}) }),
    [components]
  );

  /* Event Handlers */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    const newFormValues = { ...formValues, [name]: value };
    runValidation({ formValues: newFormValues, eventType: 'change' });

    setFormValues(newFormValues);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name } = event.target;
    // only update state and run validation if this is the first time blurring the field
    if (!blurredFields.current.includes(name)) {
      const newBlurredFields = [...blurredFields.current, name];
      blurredFields.current = newBlurredFields;
      runValidation({ formValues, eventType: 'blur' });
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
    <View
      as="form"
      className={ComponentClassName.ChangePassword}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <CurrentPasswordField
          autoComplete="current-password"
          isRequired
          label={currentPasswordLabel}
          name="currentPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <NewPasswordField
          autoComplete="new-password"
          fieldValidationErrors={validationError?.newPassword}
          isRequired
          label={newPasswordLabel}
          name="newPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <ConfirmPasswordField
          autoComplete="new-password"
          fieldValidationErrors={validationError?.confirmPassword}
          isRequired
          label={confirmPasswordLabel}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <SubmitButton isDisabled={isDisabled} type="submit">
          {updatePasswordText}
        </SubmitButton>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </Flex>
    </View>
  );
}

ChangePassword.CurrentPasswordField = DEFAULTS.CurrentPasswordField;
ChangePassword.NewPasswordField = DEFAULTS.NewPasswordField;
ChangePassword.ConfirmPasswordField = DEFAULTS.ConfirmPasswordField;
ChangePassword.SubmitButton = DEFAULTS.SubmitButton;
ChangePassword.ErrorMessage = DEFAULTS.ErrorMessage;

export default ChangePassword;
