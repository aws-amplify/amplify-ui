import QRCode from 'qrcode';
import * as React from 'react';

import { Auth, Logger } from 'aws-amplify';
import { getActorState, SignInState, translate } from '@aws-amplify/ui';

import { Flex, Heading } from '../../..';

import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';
import { ConfirmSignInFooter, RemoteErrorMessage } from '../shared';
import { FormFields } from '../shared/FormFields';

const logger = new Logger('SetupTOTP-logger');

export const SetupTOTP = (): JSX.Element => {
  // TODO: handle `formOverrides` outside `useAuthenticator`
  const { _state, isPending } = useAuthenticator((context) => [
    context.isPending,
  ]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      SetupTOTP: { Header = SetupTOTP.Header, Footer = SetupTOTP.Footer },
    },
  } = useCustomComponents();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [qrCode, setQrCode] = React.useState<string>();
  const [copyTextLabel, setCopyTextLabel] = React.useState<string>('COPY');
  const [secretKey, setSecretKey] = React.useState<string>('');

  // `user` hasn't been set on the top-level state yet, so it's only available from the signIn actor
  const actorState = getActorState(_state) as SignInState;

  const { user } = actorState.context;

  const formOverrides = getActorState(_state).context?.formFields?.setupTOTP;

  const QROR = formOverrides?.['QR'];

  const generateQRCode = async (user): Promise<void> => {
    try {
      const newSecretKey = await Auth.setupTOTP(user);
      setSecretKey(newSecretKey);
      const issuer = QROR?.totpIssuer ?? 'AWSCognito';
      const username = QROR?.totpUsername ?? user.username;
      const totpCode = `otpauth://totp/${issuer}:${username}?secret=${newSecretKey}&issuer=${issuer}`;
      const qrCodeImageSource = await QRCode.toDataURL(totpCode);

      setQrCode(qrCodeImageSource);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!user) return;

    generateQRCode(user);
  }, [user]);

  const copyText = (): void => {
    navigator.clipboard.writeText(secretKey);
    setCopyTextLabel(translate('COPIED'));
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-setup-totp=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          {/* TODO: Add spinner here instead of loading text... */}
          {isLoading ? (
            <p>{translate('Loading')}&hellip;</p>
          ) : (
            <img
              data-amplify-qrcode
              src={qrCode}
              alt="qr code"
              width="228"
              height="228"
            />
          )}
          <Flex data-amplify-copy>
            <div>{secretKey}</div>
            <Flex data-amplify-copy-svg onClick={copyText}>
              <div data-amplify-copy-tooltip>{copyTextLabel}</div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6.01 5.9 6.01 7L6 21C6 22.1 6.89 23 7.99 23H19C20.1 23 21 22.1 21 21V11L15 5ZM8 21V7H14V12H19V21H8Z" />
              </svg>
            </Flex>
          </Flex>
          <FormFields route="setupTOTP" />
          <RemoteErrorMessage />
        </Flex>

        <ConfirmSignInFooter />
        <Footer />
      </fieldset>
    </form>
  );
};

SetupTOTP.Header = () => {
  return <Heading level={3}>{translate('Setup TOTP')}</Heading>;
};

SetupTOTP.Footer = (): JSX.Element => null;
