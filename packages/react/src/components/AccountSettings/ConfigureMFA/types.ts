import React from 'react';
import { FormValues } from '../types';

// Shared types
export type MFAType = 'SMS' | 'TOTP' | 'NOMFA';
export interface ConfigureMFAProps {
  /** callback for successful mfa update */
  onSuccess?: () => void;

  /** callback for unsuccessful user update  */
  onError?: (error: Error) => void;

  children: React.ReactNode;
}

/*
 * The flow of this compnent is:
 *
 * 1. App is initiall in "IDLE" state
 * 2. User selects desired MFA type in "SELECT_MFA" state.
 * 3a. If user selects TOTP MFA, they set it up in "CONFIGURE_TOTP" state
 * 3b-1. If User selects SMS MFA, they enter desired phone number in "CONFIGURE_SMS" state
 * 3b-2. User confirms their phone number to finish sms setup
 * 5. app is done in "DONE" state
 */
export type ConfigureMFAState =
  | 'IDLE'
  | 'DISABLING_MFA'
  | 'SELECT_MFA'
  | 'CONFIGURE_TOTP'
  | 'CONFIGURE_SMS'
  | 'VERIFY_SMS'
  | 'LOADING'
  | 'DONE';

// subcomponent types
export interface SelectMFAProps {
  /** Callback when end user cancels mfa selection */
  onCancel?: () => void;
  /** Callback when end user changes their mfa selection */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Callback when end user selects desired mfa selection and clicks "continue" button */
  onSubmit?: React.FormEventHandler;
  /** Whether to show warning that changing your MFA will invalidate your old one */
  showWarning?: () => void;
  /** Current MFA selection */
  selection?: string;
  /** Whether continue button is disabled */
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export interface MFAOptionProps {
  mfaType: 'SMS' | 'TOTP';
}

export interface DisplayCurrentMFAProps {
  onDisableMFA?: () => void;
  onUpdateMFA?: () => void;
  currentMFA?: MFAType;
}

export interface ConfigureTOTPProps {
  getTotpSecretCode?: () => Promise<string>;
  qrCode?: () => string;
  totpIssuer?: string;
  totpUsername?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onCancel?: () => void;
}

export interface ConfigureSMSProps {
  defaultDialCode?: string;
  formValues?: FormValues;
  hasPhoneNumber?: boolean;
  isVerified?: boolean;
  onCancel?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDialCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export interface VerifySMSProps {
  phoneNumber?: string; // pre-existing phone number, if any
  onCancel?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
