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
import { ComponentClassName } from '../constants';
import {
  ConfirmationCode,
  CopySecretKey,
  Error,
  SecretKeyQRCode,
  SubmitButton,
} from './defaults';
import { ConfigureTOTPProps, TotpSecret, VerifyTotpStatus } from './types';
import { QR_CODE_DIMENSIONS } from './constants';

const logger = getLogger('Auth');

function SetupTOTP({
  totpIssuer = 'AWSCognito',
  totpUsername,
  onSuccess,
  onError,
}: ConfigureTOTPProps): JSX.Element | null {
  const [formValues, setFormValues] = React.useState<FormValues>({ code: '' });
  const [totpSecret, setTotpSecret] = React.useState<TotpSecret>(null);
  const [verifyTotpStatus, setVerifyTotpStatus] =
    React.useState<VerifyTotpStatus>({
      isVerifying: false,
      errorMessage: null,
    });

  const { user, isLoading } = useAuth();

  const hasInit = React.useRef(false);

  const generateQRCode = React.useCallback(
    async (currentUser: AmplifyUser): Promise<void> => {
      try {
        const secretKey = await setupTOTP(currentUser);
        const username = totpUsername || currentUser?.username;
        const totpCode = getTotpCodeURL(totpIssuer, username, secretKey);
        const qrCode = await QRCode.toDataURL(totpCode);

        setTotpSecret({ secretKey, qrCode });
      } catch (e) {
        logger.error(e);
      }
    },
    [totpIssuer, totpUsername]
  );

  React.useEffect(() => {
    if (user && !hasInit.current) {
      hasInit.current = true;
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
      setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    },
    []
  );

  const runVerifyTotpToken = React.useCallback(
    async ({ user, code }: { user: AmplifyUser; code: string }) => {
      setVerifyTotpStatus({ isVerifying: true, errorMessage: null });

      try {
        await verifyTOTPToken({ user, code });

        setVerifyTotpStatus({ isVerifying: false, errorMessage: null });

        onSuccess?.(); // notify success to the parent
      } catch (e) {
        const error = e as Error;

        setVerifyTotpStatus({
          isVerifying: false,
          errorMessage: error.message,
        });

        onError?.(error); // notify error to the parent
      }
    },
    [onError, onSuccess]
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
    navigator.clipboard.writeText(totpSecret.secretKey);
  }, [totpSecret]);

  /* Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isLoading) {
    return null;
  }

  /* Return null if user isn't authenticated in the first place */
  if (!user) {
    logger.warn('<SetupTOTP /> requires user to be authenticated.');
    return null;
  }

  const { isVerifying, errorMessage } = verifyTotpStatus;

  return (
    <View
      as="form"
      className={ComponentClassName.SetupTOTP}
      onSubmit={handleSubmit}
    >
      <Flex direction="column" alignItems="center">
        {totpSecret?.qrCode ? (
          <SecretKeyQRCode
            src={totpSecret?.qrCode}
            alt="qr code"
            {...QR_CODE_DIMENSIONS}
          />
        ) : null}
        <CopySecretKey
          isDisabled={isVerifying}
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
          isDisabled={isVerifying}
        />

        <SubmitButton
          type="submit"
          variation="primary"
          isDisabled={isVerifying || !formValues.code}
          isFullWidth
        >
          {confirmText}
        </SubmitButton>
        {errorMessage ? <Error width="100%">{errorMessage}</Error> : null}
      </Flex>
    </View>
  );
}

export default SetupTOTP;
