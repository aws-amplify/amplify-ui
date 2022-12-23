import QRCode from 'qrcode';
import * as React from 'react';

import { Logger } from 'aws-amplify';
import { authenticatorTextUtil, getTotpCodeURL } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

const logger = new Logger('SetupTOTP-logger');

type LegacyQRFields = { totpIssuer?: string; totpUsername?: string };

const { getSetupTOTPText, getCopiedText, getLoadingText } =
  authenticatorTextUtil;

export const SetupTOTP = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { getTotpSecretCode, isPending, user, QRFields } = useAuthenticator(
    (context) => [context.isPending]
  );

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
  const { totpIssuer = 'AWSCognito', totpUsername = user?.username } =
    (QRFields as LegacyQRFields) ?? {};

  const generateQRCode = React.useCallback(async (): Promise<void> => {
    try {
      const newSecretKey = await getTotpSecretCode();
      setSecretKey(newSecretKey);
      const totpCode = getTotpCodeURL(totpIssuer, totpUsername, newSecretKey);
      const qrCodeImageSource = await QRCode.toDataURL(totpCode);

      setQrCode(qrCodeImageSource);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getTotpSecretCode, totpIssuer, totpUsername]);

  React.useEffect(() => {
    if (!qrCode) {
      generateQRCode();
    }
  }, [generateQRCode, qrCode]);

  const copyText = (): void => {
    navigator.clipboard.writeText(secretKey);
    setCopyTextLabel(getCopiedText());
  };

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-setup-totp=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            {/* TODO: Add spinner here instead of loading text... */}
            {isLoading ? (
              <p>{getLoadingText()}&hellip;</p>
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
            <FormFields />
            <RemoteErrorMessage />
          </Flex>

          <ConfirmSignInFooter />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

SetupTOTP.Header = function Header(): JSX.Element {
  return <Heading level={3}>{getSetupTOTPText()}</Heading>;
};

SetupTOTP.Footer = function Footer(): JSX.Element {
  return null;
};
