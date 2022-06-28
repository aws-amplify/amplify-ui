// import {
//   ColorValue,
//   ImageStyle,
//   StyleProp,
//   TextStyle,
//   ViewStyle,
// } from 'react-native';
import { MessageLayout, MessagePayloadStyle } from '@aws-amplify/ui-react-core';

import { ButtonProps } from '../../primitives';

import { ImageDimensions } from '../useMessageImage';

/**
 * Resolved message types
 */
export interface MessageComponentStyles {
  body: unknown;
  buttonsContainer: unknown;
  container: unknown;
  contentContainer: unknown;
  header: unknown;
  iconButton: { container: unknown; iconColor?: string };
  imageContainer: unknown;
  image: unknown;
  primaryButton: MessageButtonStyleProps;
  secondaryButton: MessageButtonStyleProps;
  textContainer: unknown;
  wrapper: unknown;
}

export type GetDefaultStyle<AdditionalStyle = unknown> = (
  imageDimensions: ImageDimensions,
  additionalStyle?: AdditionalStyle
) => MessageDefaultStyle;

export interface UseMessageProps {
  hasButtons: boolean;
  hasPrimaryButton: boolean;
  hasRenderableImage: boolean;
  hasSecondaryButton: boolean;
  shouldRenderMessage: boolean;
  styles: MessageComponentStyles | null;
}

export interface MessageStyleParams {
  /**
   * message specific layout
   */
  layout: MessageLayout;

  /**
   * style params to derive resolved style from
   */
  styleParams: StyleParams;
}

export interface StyleParams {
  /**
   * default component styles defined at the UI component level
   */
  defaultStyle: MessageDefaultStyle;

  /**
   * message specific styles in the message payload
   */
  payloadStyle: MessagePayloadStyle;

  /**
   * custom component style passed as style prop to message UI components
   */
  overrideStyle: MessageOverrideStyle;
}

export interface MessageButtonStyleParams {
  /**
   * message button types
   */
  buttonType: 'primaryButton' | 'secondaryButton';

  /**
   * style params to derive resolved style from
   */
  styleParams: StyleParams;
}

/**
 * Default Message UI component style props
 */
export interface MessageDefaultStyle {
  body: unknown;
  buttonContainer: unknown;
  buttonsContainer: unknown;
  buttonText: unknown;
  container: unknown;
  contentContainer: unknown;
  header: unknown;
  iconButton: unknown;
  image: unknown;
  imageContainer: unknown;
  textContainer: unknown;
  wrapper: unknown;
}

export interface MessageButtonStyleProps {
  container?: ButtonProps['style'];
  text?: ButtonProps['textStyle'];
}

export interface MessageContainerAndWrapperStyle {
  container: [
    defaultStyle: unknown,
    messageStyle: unknown,
    overrideStyle: unknown
  ];
  wrapper: unknown;
}

/**
 * Override style props
 */
export interface MessageOverrideStyle {
  body?: unknown;
  closeIconButton?: unknown;
  closeIconColor?: string;
  container?: unknown;
  header?: unknown;
  image?: unknown;
  primaryButton?: MessageButtonStyleProps;
  secondaryButton?: MessageButtonStyleProps;
}
