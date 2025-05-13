import type React from 'react';

export function isComponent<T>(
  component?: React.ComponentType<T> | React.ForwardRefExoticComponent<T>
): component is React.ComponentType<T> {
  return typeof component === 'function';
}

export function isForwardRefExoticComponent<T>(
  component: React.ComponentType<T> | React.ForwardRefExoticComponent<T>
): component is React.ForwardRefExoticComponent<T> {
  return (
    typeof component === 'object' &&
    typeof (component as React.ForwardRefExoticComponent<T>).$$typeof ===
      'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(
      (component as React.ForwardRefExoticComponent<T>).$$typeof.description!
    )
  );
}
