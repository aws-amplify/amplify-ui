import {
  ColorValue,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  InAppMessageLayout,
  MessagePayloadStyle,
} from '@aws-amplify/ui-react-core-notifications';

import { ButtonProps } from '../../../primitives';

import { ImageDimensions } from '../useMessageImage';

/**
 * Resolved message types
 */
export interface MessageComponentStyles {
  body: StyleProp<TextStyle>;
  buttonsContainer: StyleProp<ViewStyle>;
  container: StyleProp<ViewStyle>;
  contentContainer: StyleProp<ViewStyle>;
  header: StyleProp<TextStyle>;
  iconButton: { container: StyleProp<ViewStyle>; iconColor?: ColorValue };
  imageContainer: StyleProp<ViewStyle>;
  image: StyleProp<ImageStyle>;
  primaryButton: MessageButtonStyleProps;
  secondaryButton: MessageButtonStyleProps;
  textContainer: StyleProp<ViewStyle>;
  wrapper: StyleProp<ViewStyle>;
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
  layout: InAppMessageLayout;

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
  body: TextStyle;
  buttonContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  buttonText: TextStyle;
  container: ViewStyle;
  contentContainer: ViewStyle;
  header: TextStyle;
  iconButton: ViewStyle;
  image: ImageStyle;
  imageContainer: ViewStyle;
  textContainer: ViewStyle;
  wrapper: ViewStyle;
}

export interface MessageButtonStyleProps {
  container?: ButtonProps['style'];
  text?: ButtonProps['textStyle'];
}

export interface MessageContainerAndWrapperStyle {
  container: [
    defaultStyle: StyleProp<ViewStyle>,
    messageStyle: StyleProp<ViewStyle>,
    overrideStyle: StyleProp<ViewStyle>,
  ];
  wrapper: StyleProp<ViewStyle>;
}

/**
 * Override style props
 */
export interface MessageOverrideStyle {
  body?: StyleProp<TextStyle>;
  closeIconButton?: StyleProp<ViewStyle>;
  closeIconColor?: ColorValue;
  container?: StyleProp<ViewStyle>;
  header?: StyleProp<TextStyle>;
  image?: StyleProp<ImageStyle>;
  primaryButton?: MessageButtonStyleProps;
  secondaryButton?: MessageButtonStyleProps;
}
