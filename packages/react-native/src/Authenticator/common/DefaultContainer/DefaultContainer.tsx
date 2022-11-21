import React, { useMemo } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../../theme';
import { getThemedStyles } from './styles';
import { ContainerProps } from './types';

// prevent bounce when `ScrollView` content is less than height of screnn
const ALWAYS_BOUNCE_VERTICAL = false;
// prevent keyboard dismiss when press is handled by `ScrollView` children,
// otherwise dismiss
const KEYBOARD_SHOULD_PERSIST_TAPS = 'handled';
// temporary value to prevent top `TextField` from being pushed too high
// in default use case
const KEYBOARD_VERTICAL_OFFSET = -200;

export default function DefaultContainer({
  alwaysBounceVertical = ALWAYS_BOUNCE_VERTICAL,
  children,
  keyboardAvoidingViewStyle,
  keyboardShouldPersistTaps = KEYBOARD_SHOULD_PERSIST_TAPS,
  keyboardVerticalOffset = KEYBOARD_VERTICAL_OFFSET,
  scrollViewContentContainerStyle,
  style,
  ...rest
}: ContainerProps): JSX.Element | null {
  const theme = useTheme();
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets();

  const themedStyle = useMemo(
    () => getThemedStyles(theme, { paddingBottom, paddingTop }),
    [paddingBottom, paddingTop, theme]
  );

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[themedStyle.keyboardAvoidingView, keyboardAvoidingViewStyle]}
    >
      <ScrollView
        {...rest}
        alwaysBounceVertical={alwaysBounceVertical}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[
          themedStyle.scrollViewContentContainer,
          scrollViewContentContainerStyle,
        ]}
        style={[themedStyle.scrollView, style]}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
