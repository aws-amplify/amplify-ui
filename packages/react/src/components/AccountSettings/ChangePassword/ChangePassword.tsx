import React from 'react';

import { Logger } from 'aws-amplify';
import { changePassword } from '@aws-amplify/ui';

import { getFormDataFromEvent } from '../../../helpers';
import { Flex, Button, View, Alert } from '../../../primitives';
import {
  DefaultConfirmPassword,
  DefaultCurrentPassword,
  DefaultNewPassword,
} from './defaultComponents';
import { ChangePasswordProps } from './types';
import { useAuth } from '../../../internal';

const logger = new Logger('ChangePassword');

const ChangePassword: React.ComponentType<ChangePasswordProps> = (props) => {
  const { onSuccess, onError } = props;
  const [error, setError] = React.useState<string>(null);

  const { user } = useAuth();

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formValues = getFormDataFromEvent(event);
      const { currentPassword, newPassword } = formValues;

      try {
        await changePassword({ user, currentPassword, newPassword });
        onSuccess();
      } catch (e) {
        const error = e as Error;
        setError(error.message);
        onError(error);
      }
    },
    [onError, onSuccess, user]
  );

  if (!user) {
    logger.warn('ChangePassword requires user to be authenticated.');
    return null;
  }

  return (
    <View as="form" onSubmit={handleSubmit}>
      <Flex direction="column">
        <DefaultCurrentPassword />
        <DefaultNewPassword />
        <DefaultConfirmPassword />
        <Button type="submit">Update password</Button>
        <Alert variation="error">{error}</Alert>
      </Flex>
    </View>
  );
};

export default ChangePassword;
