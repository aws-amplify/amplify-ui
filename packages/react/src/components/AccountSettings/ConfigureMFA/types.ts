import React from 'react';
import { MFAType } from '@aws-amplify/ui';

import { FormValues } from '../types';

export interface MFAOptionProps {
  mfaType: Extract<MFAType, 'sms' | 'totp'>;
}

export interface SelectMFAViewProps {
  /* Callback when end user cancels mfa selection */
  onCancel?: () => void;
  /* Callback when end user changes their mfa selection */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /* Callback when end user selects desired mfa selection and clicks "continue" button */
  onSubmit: React.FormEventHandler;
  /* Current MFA selection */
  selectedMFA?: string;
  /* Whether continue button is disabled */
  isDisabled: boolean;
  /* SelectMFA accepts a list of `<ConfigureMFA.Option />` */
  children?: React.ReactNode;
}

export interface SetupSMSViewProps {
  defaultDialCode?: string;
  formValues: FormValues;
  isDisabled: boolean;
  onCancel: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onDialCodeChange: React.ChangeEventHandler<HTMLSelectElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export interface VerifySMSViewProps {
  onCancel: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export interface CurrentMFAViewProps {
  onDisableMFA: () => void;
  onUpdateMFA: () => void;
  currentMFA: MFAType;
}
