import React from 'react';
import QRCode from 'qrcode';

import { getLogger, getTotpCodeURL, translate } from '@aws-amplify/ui';

import { Button, Flex, TextField, View } from '../../../../primitives';
import { ConfigureTOTPProps } from '../types';

const logger = getLogger('Auth');

export const ConfigureTOTP = ({
  getTotpSecretCode,
  totpIssuer = 'AWSCognito',
  totpUsername,
  onChange,
  onSubmit,
  onCancel,
}: ConfigureTOTPProps): JSX.Element => {
  const [qrCode, setQrCode] = React.useState<string>(null);
  const [secretKey, setSecretKey] = React.useState<string>(null);

  const generateQRCode = React.useCallback(async (): Promise<void> => {
    try {
      const newSecretKey = await getTotpSecretCode();
      setSecretKey(newSecretKey);
      const totpCode = getTotpCodeURL(totpIssuer, totpUsername, newSecretKey);
      const qrCodeImageSource = await QRCode.toDataURL(totpCode);

      setQrCode(qrCodeImageSource);
    } catch (e) {
      logger.error(e);
    }
  }, [getTotpSecretCode, totpIssuer, totpUsername]);

  React.useEffect(() => {
    if (!secretKey) {
      generateQRCode();
    }
  }, [generateQRCode, secretKey]);

  // translations
  const confirmText = translate('Confirm');
  const backText = translate('Back');
  const copyCodeText = translate('Copy Secret Code');

  // event handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
  };

  return (
    <View as="form" onSubmit={onSubmit}>
      <Flex direction="column">
        {qrCode ? (
          <img
            data-amplify-qrcode
            src={qrCode}
            alt="qr code"
            width="228"
            height="228"
          />
        ) : null}
        <Button onClick={handleCopy}>{copyCodeText}</Button>
        <TextField
          onChange={onChange}
          name="code"
          label="Confirmation Code"
          placeholder="Code"
        ></TextField>
        <Flex justifyContent="space-between">
          <Button variation="link" onClick={onCancel}>
            {backText}
          </Button>
          <Button type="submit" variation="primary">
            {confirmText}
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};
