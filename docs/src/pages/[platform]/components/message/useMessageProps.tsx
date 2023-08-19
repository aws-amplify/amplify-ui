import { demoState } from '@/utils/demoState';
import { MessageProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { MessagePropControlsProps } from './MessagePropControls';

interface UseMessageProps {
  (initialValues: MessageProps): MessagePropControlsProps;
}

export const useMessageProps: UseMessageProps = (initialValues) => {
  const [colorTheme, setColorTheme] = React.useState<
    MessageProps['colorTheme']
  >(initialValues.colorTheme);
  const [content, setContent] = React.useState<MessageProps['content']>(
    initialValues.content
  );
  const [hasIcon, setHasIcon] = React.useState<MessageProps['hasIcon']>(
    initialValues.hasIcon
  );
  const [heading, setHeading] = React.useState<MessageProps['heading']>(
    initialValues.heading
  );
  const [isDismissible, setIsDismissible] = React.useState<
    MessageProps['isDismissible']
  >(initialValues.isDismissible);
  const [variation, setVariation] = React.useState<MessageProps['variation']>(
    initialValues.variation
  );
  React.useEffect(() => {
    demoState.set('Message', {
      colorTheme,
      content,
      hasIcon,
      heading,
      isDismissible,
      variation,
      setColorTheme,
      setContent,
      setHasIcon,
      setHeading,
      setIsDismissible,
      setVariation,
    });
  }, [
    colorTheme,
    content,
    hasIcon,
    heading,
    isDismissible,
    variation,
    setColorTheme,
    setContent,
    setHasIcon,
    setHeading,
    setIsDismissible,
    setVariation,
  ]);

  return React.useMemo(
    () => ({
      colorTheme,
      content,
      hasIcon,
      heading,
      isDismissible,
      variation,
      setColorTheme,
      setContent,
      setHasIcon,
      setHeading,
      setIsDismissible,
      setVariation,
    }),
    [
      colorTheme,
      content,
      hasIcon,
      heading,
      isDismissible,
      variation,
      setColorTheme,
      setContent,
      setHasIcon,
      setHeading,
      setIsDismissible,
      setVariation,
    ]
  );
};
