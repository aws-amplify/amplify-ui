import {
  Alert,
  AlertVariations,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

export const UseBreakpointValueArrayExample = () => {
  const variation = useBreakpointValue([
    'info',
    'warning',
    'error',
    'success',
  ]) as AlertVariations;

  return <Alert variation={variation}>Responsive Alert</Alert>;
};
