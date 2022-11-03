import React from 'react';

import { Logger } from 'aws-amplify';
import { changePassword } from '@aws-amplify/ui';

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

  /** Auth API Handler */
  const handleChangePassword = React.useCallback(async () => {
    const { currentPassword, newPassword } = formValues;
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

  // return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isAuthUserLoading) {
    return null;
  }

  if (!user) {
    logger.warn('<ChangePassword /> requires user to be authenticated.');
    return null;
  }

  return (
    <View as="form" className="amplify-changepassword" onSubmit={handleSubmit}>
      <Flex direction="column">
        <DefaultCurrentPassword onChange={handleChange} />
        <DefaultNewPassword onChange={handleChange} />
        <DefaultSubmitButton />
        <DefaultError errorMessage={error} />
      </Flex>
    </View>
  );
};

export default ChangePassword;
