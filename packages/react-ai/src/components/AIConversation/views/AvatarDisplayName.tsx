import React from 'react';
import { useElement } from '../context/elements';
import { TextElementProps } from '@aws-amplify/ui-react/internal';

export const DisplayName = <T extends TextElementProps>({
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
