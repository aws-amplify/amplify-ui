import React from 'react';
import QRCode from 'qrcode';

import { getLogger, getTotpCodeURL, translate } from '@aws-amplify/ui';

import {
  Alert,
  Button,
  Flex,
  PhoneNumberField,
  RadioGroupField,
  Text,
  TextField,
  View,
} from '../../../primitives';
import {
  SelectMFAProps,
  ConfigureTOTPProps,
  VerifySMSProps,
  ConfigureSMSProps,
  DisplayCurrentMFAProps,
} from './types';

const logger = getLogger('Auth');

export const EnableMFAButton = Button;

export const SelectMFA = ({
  children,
  onCancel,
  onChange,
  onContinue,
  selection,
  showWarning,
}: SelectMFAProps): JSX.Element => {
  // translations
  const mfaDescriptionText = translate(
    'Multi-factor authentication (MFA) is an extra layer of security for your account.'
  );
  const changeMFAWarningText = translate(
    'You are about to change your multi-factor authentication device. This will invalidate your current device.'
  );
  const cancelText = translate('Cancel');
  const continueText = translate('Continue');
  const mfaTypeText = translate('MFA type');

  return (
    <>
      {showWarning ? <Alert>{changeMFAWarningText}</Alert> : null}
      <Text>{mfaDescriptionText}</Text>
      <RadioGroupField
        label={translate(mfaTypeText)}
        name="mfaType"
        labelHidden
        value={selection}
        onChange={onChange}
      >
        {children}
      </RadioGroupField>
      <Flex justifyContent="space-between">
        <Button variation="link" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variation="primary" onClick={onContinue}>
          {continueText}
        </Button>
      </Flex>
    </>
  );
};

export const DisplayCurrentMFA = ({
  currentMFA,
  onUpdateMFA,
  onDisableMFA,
}: DisplayCurrentMFAProps): JSX.Element => {
  // translations
  const mfaTitleText = translate('Multi-factor authentication');
  const enabledText = translate('enabled');
  const disableMFAText = translate('Disable MFA');
  const currentMFAText = translate(currentMFA.toLowerCase());
  const currentMethodText = translate('Current MFA');
  const updateText = translate('Update');

  return (
    <Flex direction="column">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Text>
          {mfaTitleText}:{' '}
          <Text as="span" fontWeight="bold" color="font.primary">
            {enabledText}
          </Text>
        </Text>
        <Button onClick={onDisableMFA} size="small">
          {disableMFAText}
        </Button>
      </Flex>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Text color="font.secondary">
          {currentMethodText}:{' '}
          <Text as="span" fontWeight="bold" color="font.primary">
            {currentMFAText}
          </Text>
        </Text>
        <Button onClick={onUpdateMFA} size="small">
          {updateText}
        </Button>
      </Flex>
    </Flex>
  );
};

export const ConfigureTOTP = ({
  getTotpSecretCode,
  totpIssuer = 'AWSCognito',
  totpUsername,
  onChange,
  onSubmit,
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
  const copyCodeText = translate('Copy Secret Code');

  // event handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
  };

  return (
    <View as="form" className="amplify-configuretotp" onSubmit={onSubmit}>
      <Flex direction="column">
        <img
          data-amplify-qrcode
          src={qrCode}
          alt="qr code"
          width="228"
          height="228"
        />
        <Button onClick={handleCopy}>{copyCodeText}</Button>
        <TextField
          onChange={onChange}
          label="Confirmation Code"
          placeholder="Code"
        ></TextField>
        <Button type="submit">{confirmText}</Button>
      </Flex>
    </View>
  );
};

export const ConfigureSMS = ({
  onSubmit,
  onCancel,
}: ConfigureSMSProps): JSX.Element => {
  // translations
  const phoneNumberText = translate('Phone Number');
  const descriptiveText = translate('Verification codes will be sent here');
  const backText = translate('back text');
  const sendCodeText = translate('Send code');

  return (
    <View as="form" onSubmit={onSubmit}>
      <PhoneNumberField
        label={phoneNumberText}
        descriptiveText={descriptiveText}
      />

      <Flex direction="row" justifyContent="space-between">
        <Button variation="link" onClick={onCancel}>
          {backText}
        </Button>
        <Button variation="primary" type="submit">
          {sendCodeText}
        </Button>
      </Flex>
    </View>
  );
};

export const VerifySMS = ({
  onCancel,
  onSubmit,
}: VerifySMSProps): JSX.Element => {
  // translations
  const verificationCodeText = translate('Verification Code');
  const descriptiveText = translate(
    'Please enter the verification code we sent to'
  );
  const backText = translate('back');

  return (
    <View as="form" onSubmit={onSubmit}>
      <TextField
        label={verificationCodeText}
        descriptiveText={descriptiveText}
      />
      <Flex direction="row" justifyContent="space-between">
        <Button variation="link" onClick={onCancel}>
          {backText}
        </Button>
        <Button variation="primary">Confirm</Button>
      </Flex>
    </View>
  );
};
