import React from 'react';
import type { QRCodeToStringOptions } from 'qrcode';
import { toString as toQRCodeString } from 'qrcode';

import { isFunction } from '@aws-amplify/ui';

export type UseQRCodeStringParams = {
  onError?: (err: string) => void;
  onSuccess?: (output: string) => void;
  text?: string;
  options?: QRCodeToStringOptions;
};

interface UseQRCodeString {
  hasError: boolean;
  isLoading: boolean;
  qrCodeString: string | null;
}

interface UseQRCodeState
  extends Pick<UseQRCodeString, 'hasError' | 'qrCodeString'> {}

const INITIAL_OUTPUT: UseQRCodeState = { hasError: false, qrCodeString: null };
const ERROR_OUTPUT: UseQRCodeState = { hasError: true, qrCodeString: null };

/**
 * Generates a QR code string from provided `text` param
 *
 * @param {UseQRCodeStringParams} params target text and event callbacks
 * @returns {UseQRCodeString} QR code string and related values
 */
export function useQRCodeString(
  params?: UseQRCodeStringParams
): UseQRCodeString {
  const { onError, onSuccess, text, options } = params ?? {};
  const [{ hasError, qrCodeString }, setOutput] =
    React.useState<UseQRCodeState>(() => INITIAL_OUTPUT);

  // only true when a `text` param has been provided and
  // both `qrCodeString` and `hasError` are falsy
  const isLoading = !!(text && !qrCodeString && !hasError);

  React.useEffect(() => {
    if (!text) {
      return;
    }
    let ignore = false;

    toQRCodeString(text, options)
      .then((_qrCodeString) => {
        if (ignore) {
          return;
        }

        if (isFunction(onSuccess)) {
          onSuccess(_qrCodeString);
        }
        setOutput({ hasError: false, qrCodeString: _qrCodeString });
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        if (isFunction(onError)) {
          onError((error as Error).message);
        }
        setOutput(ERROR_OUTPUT);
      });

    return () => {
      ignore = true;
    };
  }, [onError, onSuccess, options, text]);

  return { hasError, isLoading, qrCodeString };
}
