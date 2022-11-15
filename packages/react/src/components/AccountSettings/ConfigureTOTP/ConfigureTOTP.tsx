import React from 'react';
import QRCode from 'qrcode';

import {
  AmplifyUser,
  getLogger,
  getTotpCodeURL,
  setupTOTP,
  translate,
  verifyTOTPToken,
} from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { View, Flex } from '../../../primitives';
import { FormValues } from '../types';
import {
  ConfirmationCode,
  CopySecretKey,
  Error,
  SecretKeyQRCode,
  SubmitButton,
} from './defaults';
import { ConfigureTOTPProps } from './types';

const logger = getLogger('Auth');

function ConfigureTOTP({
  totpIssuer = 'AWSCognito',
  totpUsername,
  onSuccess,
  onError,
}: ConfigureTOTPProps): JSX.Element | null {
  const [secretKey, setSecretKey] = React.useState<string>(null);
  const [qrCode, setQrCode] = React.useState<string>(null);
  const [formValues, setFormValues] = React.useState<FormValues>({ code: '' });
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  const { user, isLoading } = useAuth();

  const hasInit = React.useRef(false);

  const generateQRCode = React.useCallback(
    async (user: AmplifyUser): Promise<void> => {
      try {
        const newSecretKey = await setupTOTP(user);
        const username = totpUsername || user?.username;
        const totpCode = getTotpCodeURL(totpIssuer, username, newSecretKey);
        const qrCodeImageSource = await QRCode.toDataURL(totpCode);

        if (!hasInit.current) {
          setSecretKey(newSecretKey);
          setQrCode(qrCodeImageSource);
          hasInit.current = true;
        }
      } catch (e) {
        logger.error(e);
      }
    },
    [totpIssuer, totpUsername]
  );

  React.useEffect(() => {
    if (user && !hasInit.current) {
      generateQRCode(user);
    }
  }, [generateQRCode, user]);

  // translations
  const confirmText = translate('Confirm');
  const copyCodeText = translate('Copy Secret Code');

  // event handlers
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { name, value } = event.target;
      setFormValues((formValues) => ({ ...formValues, [name]: value }));
    },
    []
  );

  const runVerifyTotpToken = React.useCallback(
    async ({ user, code }: { user: AmplifyUser; code: string }) => {
      if (errorMessage) {
        setErrorMessage(null);
      }
      setIsDisabled(true);
      try {
        await verifyTOTPToken({ user, code });

        onSuccess?.(); // notify success to the parent
      } catch (e) {
        const error = e as Error;
        if (error.message) {
          setErrorMessage(error.message);
        }

        onError?.(error); // notify error to the parent
      } finally {
        setIsDisabled(false);
      }
    },
    [errorMessage, onError, onSuccess]
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { code } = formValues;
      runVerifyTotpToken({ user, code });
    },
    [user, formValues, runVerifyTotpToken]
  );

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(secretKey);
  }, [secretKey]);

  /** Return null if user isn't authenticated in the first place */
  if (!user) {
    logger.warn('<ConfigureTOTP /> requires user to be authenticated.');
    return null;
  }

  /** Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isLoading) {
    return null;
  }

  return (
    <View as="form" onSubmit={handleSubmit} disabled={isDisabled}>
      <Flex direction="column" alignItems="center">
        {qrCode ? (
          <SecretKeyQRCode
            src={qrCode}
            alt="qr code"
            width="228px"
            height="228px"
          />
        ) : null}
        <CopySecretKey
          isDisabled={isDisabled}
          alignSelf="stretch"
          onClick={handleCopy}
        >
          {copyCodeText}
        </CopySecretKey>
        <ConfirmationCode
          alignSelf="stretch"
          isRequired
          label="Confirmation Code"
          name="code"
          onChange={handleChange}
          placeholder="Code"
          value={formValues.code}
          isDisabled={isDisabled}
        />

        <SubmitButton
          type="submit"
          variation="primary"
          isDisabled={isDisabled || !formValues.code}
          isFullWidth
        >
          {confirmText}
        </SubmitButton>
        {errorMessage ? <Error width="100%">{errorMessage}</Error> : null}
      </Flex>
    </View>
  );
}

export default ConfigureTOTP;
