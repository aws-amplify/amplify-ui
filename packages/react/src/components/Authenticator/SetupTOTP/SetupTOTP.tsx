import { getActorState, SignInState } from '@aws-amplify/ui';
import { Auth, I18n, Logger } from 'aws-amplify';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

import { useAuthenticator } from '..';
import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  ConfirmSignInFooterProps,
  RemoteErrorMessage,
} from '../shared';

const logger = new Logger('SetupTOTP-logger');

export const SetupTOTP = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qrCode, setQrCode] = useState<string>();

  const [_state, send] = useAuthenticator();
  const actorState = getActorState(_state) as SignInState;
  const isPending = actorState.matches('confirmSignIn.pending');

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
    const { user } = actorState.context;
    if (!user) {
      return;
    }

    generateQRCode(user);
  }, []);

  const footerProps: ConfirmSignInFooterProps = {
    isPending,
    send,
  };

  return (
    <Form
      data-amplify-authenticator-setup-totp=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Flex direction="column">
        <Heading level={3}>Setup TOTP</Heading>

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

        <ConfirmSignInFooter {...footerProps} />
      </Flex>
    </Form>
  );
};
