import React from 'react';

import { Logger } from 'aws-amplify';
import { changePassword, translate } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Flex, Button, Alert } from '../../../primitives';
import {
  DefaultCurrentPassword,
  DefaultNewPassword,
} from './defaultComponents';
import { ChangePasswordProps } from './types';
import { FormValues } from '../types';

const logger = new Logger('ChangePassword');

const ChangePassword: React.ComponentType<ChangePasswordProps> = (props) => {
  const { onSuccess, onError } = props;
  const [error, setError] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({});

  const { user } = useAuth();

  /** Translations */
  const submitText = translate('Submit');

  /** Auth API Handler */
  const handleChangePassword = React.useCallback(async () => {
    const { currentPassword, newPassword } = formValues;
    try {
      await changePassword({ user, currentPassword, newPassword });

      onSuccess(); // notify success to the parent
    } catch (e) {
      const error = e as Error;
      setError(error.message);

      onError(error); // notify error to the parent
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
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleChangePassword();
    },
    [handleChangePassword]
  );

  if (!user) {
    logger.warn('<ChangePassword /> requires user to be authenticated.');
    return null;
  }

  return (
    <Flex className="amplify-changepassword" as="form" direction="column">
      <DefaultCurrentPassword onChange={handleChange} />
      <DefaultNewPassword onChange={handleChange} />
      <Button type="submit" onSubmit={handleSubmit}>
        {submitText}
      </Button>
      <Alert variation="error">{error}</Alert>
    </Flex>
  );
};

export default ChangePassword;
