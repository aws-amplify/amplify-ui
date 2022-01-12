import * as React from 'react';

// Type shim for React.useId support
declare module 'React' {
  export const useId: () => string | undefined;
}
