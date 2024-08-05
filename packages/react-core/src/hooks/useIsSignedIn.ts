import { Hub } from 'aws-amplify/utils';
import { useEffect, useState } from 'react';
import { HubCallback } from '@aws-amplify/core';
import { getCurrentUser } from 'aws-amplify/auth';

/**
 * Returns `false`:
 * - if user has no credentials cached in browser storage
 * - if user signs out of account
 *
 * Returns `true`:
 * - if user has cached credentials
 * - if user signs in to account
 */
export default function useIsSignedIn(): boolean {
  const [isSigned, setIsSigned] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser()
      .then(() => {
        setIsSigned(true);
      })
      .catch(() => {
        setIsSigned(false);
      });
  }, []);

  useEffect(() => {
    const listener: HubCallback = ({ payload }) => {
      if (payload.event === 'signedIn') {
        setIsSigned(true);
      } else if (payload.event === 'signedOut') {
        setIsSigned(false);
      }
    };

    const unsubscribe = Hub.listen('auth', listener);

    return () => {
      unsubscribe();
    };
  }, []);

  return isSigned;
}
