import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core';
import { DeviceOrientation } from '../../../hooks/useDeviceOrientation';
import {
  GetDefaultStyle,
  MessageOverrideStyle,
  UseMessageProps,
} from './types';
/**
 * Handle common message UI component prop logic including setting of image dimensions,
 * render booleans, and style resolving
 *
 * @param {MessageComponentBaseProps} props - message UI component props
 * @param {GetDefaultStyle} getDefaultStyle - returns default UI component style
 * @param {DeviceOrientation} orientation - device orientation, defaults to `portrait`
 
 * @returns {UseMessageProps} message UI component render related booleans and styles
 */
export default function useMessageProps(
  props: MessageComponentBaseProps<MessageOverrideStyle>,
  getDefaultStyle: GetDefaultStyle,
  orientation?: DeviceOrientation
): UseMessageProps;
