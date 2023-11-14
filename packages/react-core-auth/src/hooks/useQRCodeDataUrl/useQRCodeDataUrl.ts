import React from 'react';
import QRCode from 'qrcode';

import { isFunction } from '@aws-amplify/ui';

interface UseQRCodeUrlParams {
  input: string | undefined;
  onError?: (err: string) => void;
  onSuccess?: (dataUrl: string) => void;
}

interface UseQRCodeUrl {
  dataUrl: string | undefined;
  hasError: boolean;
  isLoading: boolean;
}

const INITIAL_OUTPUT: UseQRCodeUrl = {
  dataUrl: undefined,
  hasError: false,
  isLoading: true,
};

/**
 * Generates a QR code data url.
 *
 * @param {UseQRCodeUrlParams} params input and event callbacks
 * @returns {UseQRCodeUrl} data url related values
 */
export default function useQRCodeDataUrl({
  input,
  onError,
  onSuccess,
}: UseQRCodeUrlParams): UseQRCodeUrl {
  const [output, setOutput] = React.useState<UseQRCodeUrl>(
    () => INITIAL_OUTPUT
  );

  React.useEffect(() => {
    if (!input || output.dataUrl) {
      return;
    }

    let ignore = false;
    try {
      QRCode.toDataURL(input).then((dataUrl) => {
        if (ignore) {
          return;
        }

        if (isFunction(onSuccess)) {
          onSuccess(dataUrl);
        }
        setOutput((prev) => ({ ...prev, dataUrl, isLoading: false }));
      });
    } catch (error) {
      if (ignore) {
        return;
      }

      if (isFunction(onError)) {
        onError((error as Error).message);
      }
      setOutput((prev) => ({ ...prev, hasError: true, isLoading: false }));
    }

    return () => {
      ignore = true;
    };
  }, [input, onError, onSuccess, output.dataUrl]);

  return output;
}
