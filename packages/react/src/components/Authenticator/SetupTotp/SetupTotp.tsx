import QRCode from 'qrcode';
import * as React from 'react';

import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import { authenticatorTextUtil, getTotpCodeURL } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';
import type { RouteProps } from '../RouteContainer';
import { RouteContainer } from '../RouteContainer';

const logger = new Logger('SetupTotp-logger');

type LegacyQRFields = { totpIssuer?: string; totpUsername?: string };

const { getSetupTotpText, getCopiedText, getLoadingText } =
  authenticatorTextUtil;

export const SetupTotp = ({
  className,
  variation,
}: RouteProps): React.JSX.Element => {
  const { totpSecretCode, isPending, username, QRFields } = useAuthenticator(
    (context) => [context.isPending, context.totpSecretCode, context.username]
  );

  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SetupTotp: { Header = SetupTotp.Header, Footer = SetupTotp.Footer },
    },
  } = useCustomComponents();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [qrCode, setQrCode] = React.useState<string>();
  const [copyTextLabel, setCopyTextLabel] = React.useState<string>('COPY');

  const { totpIssuer = 'AWSCognito', totpUsername = username } =
    (QRFields as LegacyQRFields) ?? {};

  const generateQRCode = React.useCallback(async (): Promise<void> => {
    try {
      const totpCode = getTotpCodeURL(
        totpIssuer,
        totpUsername,
        totpSecretCode!
      );

      const qrCodeImageSource = await QRCode.toDataURL(totpCode);

      setQrCode(qrCodeImageSource);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [totpIssuer, totpUsername, totpSecretCode]);

  React.useEffect(() => {
    if (!qrCode) {
      generateQRCode();
    }
  }, [generateQRCode, qrCode]);

  const copyText = (): void => {
    navigator.clipboard.writeText(totpSecretCode!);
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
              <div>{totpSecretCode}</div>
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

SetupTotp.Header = function Header(): React.JSX.Element {
  return <Heading level={3}>{getSetupTotpText()}</Heading>;
};

SetupTotp.Footer = function Footer(): React.JSX.Element {
  // @ts-ignore
  return null;
};
