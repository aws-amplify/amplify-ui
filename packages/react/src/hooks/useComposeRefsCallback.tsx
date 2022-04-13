import * as React from 'react';

export interface UseComposeRefsCallbackProps<RefType> {
  externalRef: React.ForwardedRef<RefType>;
  internalRef: React.MutableRefObject<RefType>;
}

export type UseComposeRefsCallback<RefType> = (node: RefType) => void;

/**
 *  Creates ref callback to compose together external and internal refs
 */
export function useComposeRefsCallback<RefType>({
  externalRef,
  internalRef,
}: UseComposeRefsCallbackProps<RefType>): UseComposeRefsCallback<RefType> {
  return React.useCallback(
    (node) => {
      // Handle callback ref
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef !== null) {
        externalRef.current = node;
      }

      internalRef.current = node;
    },
    [externalRef, internalRef]
  );
}
