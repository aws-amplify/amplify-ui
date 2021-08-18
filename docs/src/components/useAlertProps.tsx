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
  const [withIcon, setWithIcon] = useState<AlertProps['withIcon']>(true);
  const [title, setTitle] = useState<AlertProps['title']>('Alert title');

  return {
    variation,
    setVariation,
    isDismissible,
    setIsDismissible,
    withIcon,
    setWithIcon,
    title,
    setTitle,
  };
};
