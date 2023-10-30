import { StyleSheet } from 'react-native';
import { isFunction } from '@aws-amplify/ui';
import {
  InAppMessageLayout,
  MessageComponentBaseProps,
  MessagePayloadStyle,
} from '@aws-amplify/ui-react-core-notifications';

import { DEFAULT_CAROUSEL_INDICATOR_SIZE } from '../../../primitives';
import { BUTTON_PRESSED_OPACITY, SPACING_EXTRA_LARGE } from '../../constants';

import {
  MessageButtonStyleParams,
  MessageButtonStyleProps,
  MessageComponentStyles,
  MessageContainerAndWrapperStyle,
  MessageStyleParams,
} from './types';

// Carousel page indicator size + margins
const DEFAULT_CAROUSEL_INDICATOR_PADDING =
  (DEFAULT_CAROUSEL_INDICATOR_SIZE * 5) / 3;

/**
 * Parse and assign appropriate button container and text style from style objects params
 *
 * @param {MessageButtonStyleParams} params - message styleParams and button type
 * @returns {MessageButtonStyleProps} resolved button container and text style arrays
 */
export const getComponentButtonStyle = ({
  styleParams,
  buttonType,
}: MessageButtonStyleParams): MessageButtonStyleProps => {
  const { defaultStyle, payloadStyle, overrideStyle } = styleParams;
  // default component styles defined at the UI component level
  const {
    buttonContainer: containerDefaultStyle = {},
    buttonText: textDefaultStyle = {},
  } = defaultStyle ?? {};

  // message specific styles in the in-app message payload, overrides default component styles
  const { backgroundColor, borderRadius, color } =
    payloadStyle?.[buttonType] ?? {};

  const containePayloadStyle = {
    ...(backgroundColor ? { backgroundColor } : null),
    ...(borderRadius ? { borderRadius } : null),
  };

  const textMessageStyle = { ...(color ? { color } : null) };

  // custom component override styles passed as style prop, overrides all previous styles
  const {
    container: containerOverrideStyle = {},
    text: textOverrideStyle = {},
  } = overrideStyle?.[buttonType] ?? {};

  return {
    // the style prop of the React Native Pressable component used in the message UI accepts either a ViewStyle array
    // or a function receiving a boolean reflecting whether the component is currently pressed, returning a ViewStyle
    // array. Utilizing the latter, we add an opacity value to the UI message button style during press events
    container: ({ pressed } = { pressed: false }) => {
      // default button press interaction opacity
      const pressedOpacity = pressed ? { opacity: BUTTON_PRESSED_OPACITY } : {};

      // pass `pressed` to containerOverrideStyle and evaluate if the consumer passed a function for custom
      // button style
      const containerOverrideFinalStyle = isFunction(containerOverrideStyle)
        ? containerOverrideStyle({ pressed })
        : containerOverrideStyle;

      return [
        pressedOpacity,
        containerDefaultStyle,
        containePayloadStyle,
        containerOverrideFinalStyle,
      ];
    },
    text: [textDefaultStyle, textMessageStyle, textOverrideStyle],
  };
};

/**
 * Utility for determining if the provided layout requires filling the entire device screen.
 *
 * @param {InAppMessageLayout} layout - message layout
 * @returns {Boolean} boolean indicating whether entire screen should be filled
 */

export const shouldFillDeviceScreen = (layout: InAppMessageLayout): boolean => {
  switch (layout) {
    case 'CAROUSEL':
    case 'FULL_SCREEN': {
      return true;
    }
    case 'MODAL':
    case 'TOP_BANNER':
    case 'MIDDLE_BANNER':
    case 'BOTTOM_BANNER':
    default: {
      return false;
    }
  }
};

/**
 * Parse and assign appropriate message container and wrapper style from style params
 *
 * @param {MessageStyleParams} params - message styleParams, layout, and device orientation
 * @returns {ContainerAndWrapperStyle} resolved containerStyle and wrapperStyle
 */

export const getContainerAndWrapperStyle = ({
  styleParams,
  layout,
}: MessageStyleParams): MessageContainerAndWrapperStyle => {
  const { defaultStyle, payloadStyle, overrideStyle } = styleParams;

  const containerDefaultStyle = defaultStyle?.container ?? {};
  const containerPayloadStyle = payloadStyle?.container ?? {};
  const containerOverrideStyle = overrideStyle?.container ?? {};

  const wrapperDefaultStyle = defaultStyle?.wrapper ?? {};

  if (!shouldFillDeviceScreen(layout)) {
    return {
      wrapper: wrapperDefaultStyle,
      container: [
        containerDefaultStyle,
        containerPayloadStyle,
        containerOverrideStyle,
      ],
    };
  }

  // in non-banner and landscape modal layouts container backgroundColor values should be applied as
  // wrapper style to ensure that the backgroundColor is applied to the entire screen
  const {
    backgroundColor: defaultBackgroundColor,
    ...restContainerDefaultStyle
  } = containerDefaultStyle;
  const {
    backgroundColor: messageBackgroundColor,
    ...restContainerPayloadStyle
  } = containerPayloadStyle;

  // flatten overrideStyle to access override backgroundColor
  const {
    backgroundColor: overrideBackgroundColor,
    ...restContainerOverrideStyle
  } = StyleSheet.flatten(containerOverrideStyle);

  // all non-backgroundColor container override style are applied to the container View
  const container: MessageContainerAndWrapperStyle['container'] = [
    restContainerDefaultStyle,
    restContainerPayloadStyle,
    restContainerOverrideStyle,
  ];

  // use ternaries to prevent passing backgroundColor object with undefined or null value
  const wrapper: MessageContainerAndWrapperStyle['wrapper'] = [
    wrapperDefaultStyle,
    defaultBackgroundColor ? { backgroundColor: defaultBackgroundColor } : {},
    messageBackgroundColor ? { backgroundColor: messageBackgroundColor } : {},
    overrideBackgroundColor ? { backgroundColor: overrideBackgroundColor } : {},
  ];

  return { wrapper, container };
};

/**
 * Utility for extracting message payload style
 *
 * @param {MessageComponentBaseProps} props - message props
 * @returns {Object} message payload specific style
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
 * UI components. Handles resolvement style precedence between default, payload, and custom style
 *
 * Style param resolve precedence from lowest to highest:
 *   1. defaultStyle
 *   2. messageStyle
 *   3. overrideStyle
 *
 * @param {MessageStyleParams} params - message style params, layout, and device orientation
 * @returns {MessageStyles} message style props
 */

export function getMessageStyles({
  styleParams,
  layout,
}: MessageStyleParams): MessageComponentStyles {
  // view style applied to the wrapper and primary container views
  const { wrapper, container } = getContainerAndWrapperStyle({
    styleParams,
    layout,
  });

  // primary and secondary button container and text style
  const primaryButton = getComponentButtonStyle({
    styleParams,
    buttonType: 'primaryButton',
  });
  const secondaryButton = getComponentButtonStyle({
    styleParams,
    buttonType: 'secondaryButton',
  });

  const { defaultStyle, payloadStyle, overrideStyle } = styleParams;

  // image style composed of default and override style
  const image = [defaultStyle?.image, overrideStyle?.image];

  const iconButton = {
    // view style applied to icon button
    container: [defaultStyle?.iconButton, overrideStyle?.closeIconButton],
    // close icon color, only specified as an overrideStyle
    iconColor: overrideStyle?.closeIconColor,
  };

  // text style applied to message body and header respectively
  const body = [defaultStyle?.body, payloadStyle?.body, overrideStyle?.body];
  const header = [
    defaultStyle?.header,
    payloadStyle?.header,
    overrideStyle?.header,
  ];

  const { buttonsContainer, contentContainer, imageContainer, textContainer } =
    defaultStyle ?? {};

  const styleProps: MessageComponentStyles = {
    body,
    buttonsContainer,
    wrapper,
    contentContainer,
    container,
    header,
    iconButton,
    image,
    imageContainer,
    primaryButton,
    secondaryButton,
    textContainer,
  };

  if (layout === 'CAROUSEL') {
    styleProps.container = [
      styleProps.container,
      // Add bottom padding for carousel page indicators
      {
        paddingBottom: SPACING_EXTRA_LARGE + DEFAULT_CAROUSEL_INDICATOR_PADDING,
      },
    ];
  }

  return styleProps;
}
