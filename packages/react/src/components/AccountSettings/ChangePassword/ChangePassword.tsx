import React from 'react';

import { Logger } from 'aws-amplify';
import { changePassword, translate } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Flex } from '../../../primitives';
import {
  DefaultCurrentPassword,
  DefaultError,
  DefaultNewPassword,
  DefaultSubmitButton,
} from './defaultComponents';
import { ChangePasswordProps } from './types';
import { FormValues } from '../types';

const logger = new Logger('ChangePassword');

const ChangePassword: React.ComponentType<ChangePasswordProps> = (props) => {
  const { onSuccess, onError } = props;
  const [error, setError] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({});

  const { user, isLoading: isAuthUserLoading } = useAuth();

  /** Translations */
  // TODO: add AccountSettingsTextUtil to collect these strings
  const currentPasswordLabel = translate('Current Password');
  const newPasswordLabel = translate('New Password');
  const updatePasswordText = translate('Update password');

  /** Auth API Handler */
  const handleChangePassword = React.useCallback(async () => {
    const { currentPassword, newPassword } = formValues;
    setError(null);

    try {
      await changePassword({ user, currentPassword, newPassword });

      if (onSuccess) {
        onSuccess(); // notify success to the parent
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);

      if (onError) {
        onError(error); // notify error to the parent
      }
    }
  }, [formValues, user, onSuccess, onError]);

  /** Event Handlers */
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues]
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleChangePassword();
    },
    [handleChangePassword]
  );

  /** Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isAuthUserLoading) {
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
          onChange={handleChange}
        />
        <DefaultNewPassword
          autoComplete="new-password"
          isRequired
          label={newPasswordLabel}
          name="newPassword"
          onChange={handleChange}
        />
        <DefaultSubmitButton type="submit">
          {updatePasswordText}
        </DefaultSubmitButton>
        <DefaultError errorMessage={error} />
      </Flex>
    </View>
  );
};

export default ChangePassword;
