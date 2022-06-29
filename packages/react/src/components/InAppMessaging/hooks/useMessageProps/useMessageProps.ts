import isEmpty from 'lodash/isEmpty';
import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core';

// import { useMessageImage } from '../useMessageImage';

/**
 * Handle common message UI component prop logic including setting of image dimensions,
 * render booleans, and style resolving
 *
 * @param {MessageComponentBaseProps} props - message UI component props
 *   */

export default function useMessageProps(
  props: MessageComponentBaseProps,
  getDefaultStyle
) {
  const { image, layout, primaryButton, secondaryButton } = props;

  // const { hasRenderableImage, imageDimensions, isImageFetching } =
  //   useMessageImage(image, layout);

  // const shouldRenderMessage = !isImageFetching;
  const hasPrimaryButton = !isEmpty(primaryButton);
  const hasSecondaryButton = !isEmpty(secondaryButton);
  const hasButtons = hasPrimaryButton || hasSecondaryButton;

  const styles = [getDefaultStyle, layout, props];

  return {
    hasButtons,
    hasPrimaryButton,
    hasSecondaryButton,
    styles,
  };
}
