import { MessagePayloadStyle } from '@aws-amplify/ui-react-core';

/**
 * Inline style props for message components. Can be overridden by customer
 */
export interface MessageComponentStyles {
  body: React.CSSProperties;
  closeIconButton: React.CSSProperties;
  container: React.CSSProperties;
  header: React.CSSProperties;
  image: React.CSSProperties;
  primaryButton: React.CSSProperties;
  secondaryButton: React.CSSProperties;
}

export interface UseMessageProps {
  hasRenderableImage: boolean;
  shouldRenderMessage: boolean;
  styles: MessageComponentStyles;
}

export interface MessageStyleParams {
  /**
   * style params to derive resolved style from
   */
  styleParams: StyleParams;
}

export interface StyleParams {
  /**
   * message specific styles in the message payload
   */
  payloadStyle: MessagePayloadStyle;

  /**
   * custom component style passed as style prop to message UI components
   */
  overrideStyle?: MessageOverrideStyle;
}

/**
 * Override style props
 */
export type MessageOverrideStyle = Partial<MessageComponentStyles>;
