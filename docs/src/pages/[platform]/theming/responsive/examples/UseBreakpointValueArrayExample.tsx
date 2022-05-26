import { Alert, useBreakpointValue } from '@aws-amplify/ui-react';

export const UseBreakpointValueArrayExample = () => {
  const variation = useBreakpointValue(['info', 'warning', 'error', 'success']);

  return <Alert variation={variation}>Responsive Alert</Alert>;
};
