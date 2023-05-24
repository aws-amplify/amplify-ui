import { useContext } from 'react';
import {
  InAppMessagingContext,
  InAppMessagingContextType,
} from '../../context';

export type UseInAppMessaging = InAppMessagingContextType;

/**
 * Utility hook used to access the InAppMessagingContext values
 *
 * @returns {InAppMessagingContextType} InAppMessaging context values
 */

export default function useInAppMessaging(): UseInAppMessaging {
  const inAppMessagingContext = useContext(InAppMessagingContext);
  if (!inAppMessagingContext) {
    throw new Error(
      'InAppMessagingContext is empty, did you forget the InAppMessagingProvider?'
    );
  }
  return inAppMessagingContext;
}
