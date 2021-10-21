import { Auth, I18n, Logger } from 'aws-amplify';
import { getActorState, SignInState } from '@aws-amplify/ui';

import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import { useAuthenticator } from '..';
import { Flex, Form, Heading, Image } from '../../..';
import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  RemoteErrorMessage,
} from '../shared';

const logger = new Logger('SetupTOTP-logger');

export const SetupTOTP = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qrCode, setQrCode] = useState<string>();
  const { _state, submitForm, updateForm } = useAuthenticator();

  // `user` hasn't been set on the top-level state yet, so it's only available from the signIn actor
  const actorState = getActorState(_state) as SignInState;
  const { user } = actorState.context;

  const generateQRCode = async (user): Promise<void> => {
    try {
      const secretKey = await Auth.setupTOTP(user);
      const issuer = 'AWSCognito';
      const totpCode = `otpauth://totp/${issuer}:${user.username}?secret=${secretKey}&issuer=${issuer}`;
      const qrCodeImageSource = await QRCode.toDataURL(totpCode);

      setQrCode(qrCodeImageSource);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    generateQRCode(user);
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
      data-amplify-authenticator-setup-totp=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Setup TOTP')}</Heading>

        <Flex direction="column">
          {/* TODO: Add spinner here instead of loading text... */}
          {isLoading ? (
            <p>{I18n.get('Loading')}&hellip;</p>
          ) : (
            <Image data-amplify-qrcode src={qrCode} alt="qr code"></Image>
          )}
          <ConfirmationCodeInput />
          <RemoteErrorMessage />
        </Flex>

        <ConfirmSignInFooter />
      </Flex>
    </Form>
  );
};
