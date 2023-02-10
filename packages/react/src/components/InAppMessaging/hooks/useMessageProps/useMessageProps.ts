import { useEffect, useMemo, useRef } from 'react';

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
  const { image, onDisplay } = props;
  const hasDisplayed = useRef(false);

  const { hasRenderableImage, isImageFetching } = useMessageImage(image);

  const shouldRenderMessage = !isImageFetching;

  useEffect(() => {
    if (!hasDisplayed.current && shouldRenderMessage) {
      onDisplay?.();
      hasDisplayed.current = true;
    }
  }, [onDisplay, shouldRenderMessage]);

  const styles = useMemo(
    () =>
      getMessageStyles({
        styleParams: {
          payloadStyle: getPayloadStyle(props),
          overrideStyle: props.style,
        },
      }),
    [props]
  );

  return { hasRenderableImage, shouldRenderMessage, styles };
}
