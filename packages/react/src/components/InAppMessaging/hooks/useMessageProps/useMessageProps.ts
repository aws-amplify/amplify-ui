import { useEffect, useMemo, useRef } from 'react';

import { isEmpty } from '@aws-amplify/ui';
import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core';

import { useMessageImage } from '../useMessageImage';
import { MessageOverrideStyle, UseMessageProps } from './types';
import { getPayloadStyle, getMessageStyles } from './utils';

/**
 * Handle common message UI component prop logic including render booleans, and
 * style resolving
 *
 * @param props message UI component props
 *
 * @returns message UI component render related booleans and styles
 */

export default function useMessageProps(
  props: MessageComponentBaseProps<MessageOverrideStyle>
): UseMessageProps {
  const { image, onDisplay, primaryButton, secondaryButton } = props;
  const hasDisplayed = useRef(false);

  const { hasRenderableImage, isImageFetching } = useMessageImage(image);

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

    const payloadStyle = getPayloadStyle(props);
    const overrideStyle = props.style;

    return getMessageStyles({ styleParams: { payloadStyle, overrideStyle } });
  }, [props, shouldRenderMessage]);

  return {
    hasButtons,
    hasPrimaryButton,
    hasRenderableImage,
    hasSecondaryButton,
    shouldRenderMessage,
    styles,
  };
}
