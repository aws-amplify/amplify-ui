import React from 'react';

import {
  MessageLayout,
  MessagePayloadStyle,
  BannerMessageComponent,
} from '@aws-amplify/ui-react-core';

import { ButtonProps } from '../../primitives';
import { ImageDimensions } from '../useMessageImage';

/**
 * Resolved message types
 */
export interface MessageComponentStyles {
  body: React.CSSProperties;
  buttonsContainer: React.CSSProperties;
  container: React.CSSProperties;
  contentContainer: React.CSSProperties;
  header: React.CSSProperties;
  iconButton: {
    container: React.CSSProperties;
    iconColor?: React.CSSProperties;
  };
  imageContainer: React.CSSProperties;
  image: React.CSSProperties;
  primaryButton: MessageButtonStyleProps;
  secondaryButton: MessageButtonStyleProps;
  textContainer: React.CSSProperties;
  wrapper: React.CSSProperties;
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
  body: React.CSSProperties;
  buttonContainer: React.CSSProperties;
  buttonsContainer: React.CSSProperties;
  buttonText: React.CSSProperties;
  container: React.CSSProperties;
  contentContainer: React.CSSProperties;
  header: React.CSSProperties;
  iconButton: React.CSSProperties;
  image: React.CSSProperties;
  imageContainer: React.CSSProperties;
  textContainer: React.CSSProperties;
  wrapper: React.CSSProperties;
}

export interface MessageButtonStyleProps {
  container?: ButtonProps['style'];
  text?: ButtonProps['textStyle'];
}

export interface MessageContainerAndWrapperStyle {
  container: [
    defaultStyle: React.CSSProperties,
    messageStyle: React.CSSProperties,
    overrideStyle: React.CSSProperties
  ];
  wrapper: React.CSSProperties;
}

/**
 * Override style props
 */
export interface MessageOverrideStyle {
  body?: React.CSSProperties;
  closeIconButton?: React.CSSProperties;
  closeIconColor?: string;
  container?: React.CSSProperties;
  header?: React.CSSProperties;
  image?: React.CSSProperties;
  primaryButton?: ButtonProps['style'];
  secondaryButton?: ButtonProps['style'];
}
