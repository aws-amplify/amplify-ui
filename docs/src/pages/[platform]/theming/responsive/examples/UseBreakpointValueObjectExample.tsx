import {
  Alert,
  AlertVariations,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

export const UseBreakpointValueObjectExample = () => {
  const variation = useBreakpointValue({
    base: 'info',
    small: 'warning',
    medium: 'error',
    large: 'success',
  }) as AlertVariations;

  return <Alert variation={variation}>Responsive Alert</Alert>;
};
