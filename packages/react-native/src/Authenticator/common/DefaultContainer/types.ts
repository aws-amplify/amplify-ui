import React from 'react';
import {
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface ContainerStyles {
  keyboardAvoidingView?: ViewStyle;
  scrollViewContentContainer?: ViewStyle;
  scrollView?: ViewStyle;
}

export interface ContainerProps
  extends ScrollViewProps,
    Pick<KeyboardAvoidingViewProps, 'behavior' | 'keyboardVerticalOffset'> {
  children: React.ReactNode;
  keyboardAvoidingViewStyle?: StyleProp<ViewStyle>;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
}

export type DefaultContainerComponent<P = {}> = React.ComponentType<
  ContainerProps & P
>;

export interface InnerContainerStyles {
  container: ViewStyle;
}
