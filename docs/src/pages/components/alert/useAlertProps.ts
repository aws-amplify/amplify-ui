import { AlertProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { AlertPropControlsProps } from './AlertPropControls';

interface UseAlertProps {
  (initialValues: AlertProps & { body: string }): AlertPropControlsProps;
}

export const useAlertProps: UseAlertProps = (initialValues) => {
  const [variation, setVariation] = React.useState<AlertProps['variation']>(
    initialValues.variation
  );
  const [isDismissible, setIsDismissible] = React.useState<
    AlertProps['isDismissible']
  >(initialValues.isDismissible);
  const [hasIcon, setHasIcon] = React.useState<AlertProps['hasIcon']>(
    initialValues.hasIcon
  );
  const [heading, setHeading] = React.useState<AlertProps['heading']>(
    initialValues.heading
  );
  const [body, setBody] = React.useState<string>(initialValues.body);

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
