import {
  MessageComponentBaseProps,
  MessagePayloadStyle,
} from '@aws-amplify/ui-react-core';

import { MessageComponentStyles, MessageStyleParams } from './types';

/**
 * Utility for extracting message payload style
 *
 * @param props message props
 *
 * @returns message payload-specific styles
 */
export const getPayloadStyle = ({
  body,
  container,
  header,
  primaryButton,
  secondaryButton,
}: MessageComponentBaseProps): MessagePayloadStyle => ({
  body: body?.style ?? {},
  container: container?.style ?? {},
  header: header?.style ?? {},
  primaryButton: primaryButton?.style ?? {},
  secondaryButton: secondaryButton?.style ?? {},
});

/**
 * Receives message styling and returns style property values for use with in-app message
 * UI components. Handles resolving style precedence between payload and custom styles
 *
 * Styles resolve precedence from lowest to highest:
 *   1. Payload styles
 *   2. Custom (override) styles
 *
 * @param params message style params
 *
 * @returns message component styles
 */
export function getMessageStyles({
  styleParams,
}: MessageStyleParams): MessageComponentStyles {
  const { payloadStyle, overrideStyle } = styleParams;

  return {
    // message body style
    body: {
      ...payloadStyle?.body,
      ...overrideStyle?.body,
    },
    // close button style - not defined in payload, override only
    closeIconButton: overrideStyle?.closeIconButton ?? {},
    // message container style
    container: {
      ...payloadStyle?.container,
      ...overrideStyle?.container,
    },
    // message header style
    header: {
      ...payloadStyle?.header,
      ...overrideStyle?.header,
    },
    // image style - not defined in payload, override only
    image: overrideStyle?.image ?? {},
    // message primary button style
    primaryButton: {
      ...payloadStyle?.primaryButton,
      ...overrideStyle?.primaryButton,
    },
    // message secondary button style
    secondaryButton: {
      ...payloadStyle?.secondaryButton,
      ...overrideStyle?.secondaryButton,
    },
  };
}
