import { AlertProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { AlertPropControlsProps } from './AlertPropControls';

interface UseAlertProps {
  (initialValues: AlertProps): AlertPropControlsProps;
}

export const useAlertProps: UseAlertProps = (initialValues) => {
  const [variation, setVariation] = useState<AlertProps['variation']>(
    initialValues.variation
  );

  return {
    variation,
    setVariation,
  };
};
