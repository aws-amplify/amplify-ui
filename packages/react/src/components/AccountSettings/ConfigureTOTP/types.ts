export interface TotpSecret {
  secretKey: string;
  qrCode: string;
}

export interface ConfigureTOTPProps {
  /** TOTP issuer. Default to "AWSCognito" */
  totpIssuer?: string;
  /** TOTP username. Default to `user.username`  */
  totpUsername?: string;
  /** callback once totp is successfully set up */
  onSuccess?: () => void;
  // callback when there's an error
  onError?: (error: Error) => void;
}
