import React from 'react';

// Shared types
export type MFAType = 'SMS' | 'TOTP';
export interface ConfigureMFAProps {
  /** callback for successful mfa update */
  onSuccess?: () => void;

  /** callback for unsuccessful user update  */
  onError?: (error: Error) => void;

  children: React.ReactNode;
}

export type ConfigureMFAState =
  | 'IDLE'
  | 'SELECT_MFA'
  | 'SETUP_SMS'
  | 'SETUP_TOTP'
  | 'DONE'
  | 'ERROR';

// subcomponent types
export interface SelectMFAProps {
  /** Callback when end user changes their selection on the radiofield group */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Callback when end user cancels mfa selection */
  onCancel?: () => void;
  /** Callback when end user selects desired mfa selection and clicks "continue" button */
  onContinue?: () => void;
  /** Whether to show warning that changing your MFA will invalidate your old one */
  showWarning?: () => void;
  /** Current MFA selection */
  selection?: string;
  children?: React.ReactNode;
}

export interface SelectMFAOptionProps {
  mfaType: 'SMS' | 'TOTP';
}
