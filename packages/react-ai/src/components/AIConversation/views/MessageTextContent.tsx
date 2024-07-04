import React from 'react';
import { TextElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

export const MessageTextContent = <T extends TextElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const Text = useElement('Text');
  return (
    <Text className={className} {...rest}>
      {children}
    </Text>
  );
};
