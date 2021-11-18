import { AlertProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { AlertPropControlsProps } from './AlertPropControls';

interface UseAlertProps {
  (initialValues: AlertProps & { body: string }): AlertPropControlsProps;
}

export const useAlertProps: UseAlertProps = (initialValues) => {
  const [variation, setVariation] = useState<AlertProps['variation']>(
    initialValues.variation
  );
  const [isDismissible, setIsDismissible] = useState<
    AlertProps['isDismissible']
  >(initialValues.isDismissible);
  const [hasIcon, setHasIcon] = useState<AlertProps['hasIcon']>(
    initialValues.hasIcon
  );
  const [heading, setHeading] = useState<AlertProps['heading']>(
    initialValues.heading
  );
  const [body, setBody] = useState<string>(initialValues.body);

  return {
    variation,
    setVariation,
    isDismissible,
    setIsDismissible,
    hasIcon,
    setHasIcon,
    heading,
    setHeading,
    body,
    setBody,
  };
};
