import React from 'react';
import { Pressable, Text } from 'react-native';
import { withTheme } from '../../theme';

import { styles } from './styles';
import { ButtonProps, ButtonStyles } from './types';

function Button({
  children,
  textStyle,
  themedStyle,
  ...pressableProps
}: ButtonProps): JSX.Element {
  return (
    <Pressable {...pressableProps}>
      {typeof children === 'string' ? (
        <Text style={[themedStyle.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export default withTheme<ButtonStyles, ButtonProps>(Button, styles);
