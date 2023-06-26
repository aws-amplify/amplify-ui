import { useEffect, useMemo, useRef } from 'react';
import { isEmpty } from '@aws-amplify/ui';
import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core-notifications';

import { useMessageImage } from '../useMessageImage';
import {
  GetDefaultStyle,
  MessageOverrideStyle,
  UseMessageProps,
} from './types';
import { getPayloadStyle, getMessageStyles } from './utils';

/**
 * Handle common message UI component prop logic including setting of image dimensions,
 * render booleans, and style resolving
 *
 * @param {MessageComponentBaseProps} props - message UI component props
 * @param {GetDefaultStyle} getDefaultStyle - returns default UI component style
 *
 * @returns {UseMessageProps} message UI component render related booleans and styles
 */

export default function useMessageProps(
  props: MessageComponentBaseProps<MessageOverrideStyle>,
  getDefaultStyle: GetDefaultStyle
): UseMessageProps {
  const { image, layout, onDisplay, primaryButton, secondaryButton } = props;
  const hasDisplayed = useRef(false);

  const { hasRenderableImage, imageDimensions, isImageFetching } =
    useMessageImage(image, layout);

  const shouldRenderMessage = !isImageFetching;

  useEffect(() => {
    if (!hasDisplayed.current && shouldRenderMessage) {
      onDisplay?.();
      hasDisplayed.current = true;
    }
  }, [onDisplay, shouldRenderMessage]);

  const hasPrimaryButton = !isEmpty(primaryButton);
  const hasSecondaryButton = !isEmpty(secondaryButton);
  const hasButtons = hasPrimaryButton || hasSecondaryButton;

  const styles = useMemo(() => {
    // prevent generating style if message rendering is delayed
    if (!shouldRenderMessage) {
      return null;
    }

    const defaultStyle = getDefaultStyle(imageDimensions);
    const payloadStyle = getPayloadStyle(props);
    const overrideStyle = props.style!;

    return getMessageStyles({
      styleParams: { defaultStyle, payloadStyle, overrideStyle },
      layout,
    });
  }, [getDefaultStyle, layout, imageDimensions, props, shouldRenderMessage]);

  return {
    hasButtons,
    hasPrimaryButton,
    hasRenderableImage,
    hasSecondaryButton,
    shouldRenderMessage,
    styles,
  };
}
