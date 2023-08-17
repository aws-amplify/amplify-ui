import { demoState } from '@/utils/demoState';
import { MessageProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { MessagePropControlsProps } from './MessagePropControls';

interface UseMessageProps {
  (initialValues: MessageProps): MessagePropControlsProps;
}

export const useMessageProps: UseMessageProps = (initialValues) => {
  const [variation, setVariation] = React.useState<MessageProps['variation']>(
    initialValues.variation
  );
  const [colorTheme, setColorTheme] = React.useState<
    MessageProps['colorTheme']
  >(initialValues.colorTheme);

  React.useEffect(() => {
    demoState.set('Message', {
      variation,
      colorTheme,
      setColorTheme,
      setVariation,
    });
  }, [variation, colorTheme, setColorTheme, setVariation]);

  return React.useMemo(
    () => ({
      variation,
      colorTheme,
      setColorTheme,
      setVariation,
    }),
    [variation, colorTheme, setColorTheme, setVariation]
  );
};
