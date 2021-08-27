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
  const [isDismissible, setIsDismissible] = useState<
    AlertProps['isDismissible']
  >(initialValues.isDismissible);
  const [iconSize, setIconSize] = useState<AlertProps['iconSize']>(
    initialValues.iconSize
  );
  const [hasIcon, setHasIcon] = useState<AlertProps['hasIcon']>(
    initialValues.hasIcon
  );
  const [heading, setHeading] = useState<AlertProps['heading']>(
    initialValues.heading
  );
  const [headingLevel, setHeadingLevel] = useState<AlertProps['headingLevel']>(
    initialValues.headingLevel
  );

  return {
    variation,
    setVariation,
    isDismissible,
    setIsDismissible,
    iconSize,
    setIconSize,
    hasIcon,
    setHasIcon,
    heading,
    setHeading,
    headingLevel,
    setHeadingLevel,
  };
};
