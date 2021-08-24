import * as React from 'react';
import { LabelProps } from '../types';
import { View } from '../View';

export const Label: React.FC<LabelProps> = ({ children, htmlFor, ...rest }) => {
  return (
    <View as="label" htmlFor={htmlFor} {...rest}>
      {children}
    </View>
  );
};
