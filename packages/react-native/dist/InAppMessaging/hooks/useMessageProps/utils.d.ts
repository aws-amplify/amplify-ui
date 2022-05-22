import { InAppMessageLayout } from '@aws-amplify/notifications';
import { MessageComponentBaseProps, MessagePayloadStyle } from '@aws-amplify/ui-react-core';
import { DeviceOrientation } from '../../../hooks/useDeviceOrientation';
import { MessageButtonStyleParams, MessageButtonStyleProps, MessageComponentStyles, MessageContainerAndWrapperStyle, MessageStyleParams } from './types';
/**
 * Parse and assign appropriate button container and text style from style objects params
 *
 * @param {MessageButtonStyleParams} params - message styleParams and button type
 * @returns {MessageButtonStyleProps} resolved button container and text style arrays
 */
export declare const getComponentButtonStyle: ({ styleParams, buttonType, }: MessageButtonStyleParams) => MessageButtonStyleProps;
/**
 * Utility for determining if the provided layout, orientation or layout/orientation combination requires filling the
 * entire device screen.
 *
 * @param {InAppMessageLayout} layout - message layout
 * @param {DeviceOrientation} orientation - device orientation
 * @returns {Boolean} boolean indicating whether entire screen should be filled
 */
export declare const shouldFillDeviceScreen: (layout: InAppMessageLayout, orientation: DeviceOrientation) => boolean;
/**
 * Parse and assign appropriate message container and wrapper style from style params
 *
 * @param {MessageStyleParams} params - message styleParams, layout, and device orientation
 * @returns {ContainerAndWrapperStyle} resolved containerStyle and wrapperStyle
 */
export declare const getContainerAndWrapperStyle: ({ styleParams, layout, orientation, }: MessageStyleParams) => MessageContainerAndWrapperStyle;
/**
 * Utility for extracting message payload style
 *
 * @param {MessageComponentBaseProps} props - message props
 * @returns {Object} message payload specific style
 */
export declare const getPayloadStyle: ({ body, container, header, primaryButton, secondaryButton, }: MessageComponentBaseProps) => MessagePayloadStyle;
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
export declare function getMessageStyles({ styleParams, layout, orientation, }: MessageStyleParams): MessageComponentStyles;
