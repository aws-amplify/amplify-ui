import { Alert, useBreakpointValue } from '@aws-amplify/ui-react';

export const UseBreakpointValueExample = () => {
  const variation = useBreakpointValue({
    base: 'info',
    small: 'warning',
    medium: 'error',
    large: 'success',
  });

  return <Alert variation={variation}>Responsive Alert</Alert>;
};
