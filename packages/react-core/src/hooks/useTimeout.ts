import React from 'react';
import { isTypedFunction } from '@aws-amplify/ui';

export default function useTimeout({
  callback,
  delay,
}: {
  callback?: () => void;
  delay?: number;
}): void {
  const storedCallback = React.useRef(callback);

  React.useLayoutEffect(() => {
    storedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!isTypedFunction(storedCallback.current) || !delay) {
      return;
    }

    const timeoutId = setTimeout(() => {
      storedCallback.current?.();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);
}
