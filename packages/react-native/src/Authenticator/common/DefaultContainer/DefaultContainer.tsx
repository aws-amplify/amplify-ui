import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDeviceOrientation } from '../../../hooks';
import { useTheme } from '../../../theme';
import { platform } from '../../../utils';

import { getThemedStyles } from './styles';
import { ContainerProps } from './types';

// prevent bounce when `ScrollView` content is less than height of screnn
const ALWAYS_BOUNCE_VERTICAL = false;
const BEHAVIOR = platform.IS_IOS ? 'padding' : 'height';

// prevent keyboard dismiss when press is handled by `ScrollView` children,
// otherwise dismiss
const KEYBOARD_SHOULD_PERSIST_TAPS = 'handled';

// TEMPORARY: value to prevent initial `TextField` from being pushed too high
// in default use case
const KEYBOARD_VERTICAL_OFFSET = platform.IS_IOS ? -160 : -80;

export default function DefaultContainer({
  alwaysBounceVertical = ALWAYS_BOUNCE_VERTICAL,
  behavior = BEHAVIOR,
  children,
  keyboardAvoidingViewStyle,
  keyboardShouldPersistTaps = KEYBOARD_SHOULD_PERSIST_TAPS,
  keyboardVerticalOffset,
  scrollViewContentContainerStyle,
  style,
  ...rest
}: ContainerProps): JSX.Element | null {
  const theme = useTheme();
  const { isPortraitMode } = useDeviceOrientation();
  const insets = useSafeAreaInsets();

  const verticalOffset =
    keyboardVerticalOffset ?? isPortraitMode
      ? KEYBOARD_VERTICAL_OFFSET
      : undefined;

  const themedStyle = useMemo(() => {
    const { bottom, left, right, top } = insets;
    return getThemedStyles(theme, {
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
      paddingTop: top,
    });
  }, [insets, theme]);

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={verticalOffset}
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
