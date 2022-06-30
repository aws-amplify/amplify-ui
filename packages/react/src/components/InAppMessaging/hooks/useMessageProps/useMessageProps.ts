import isEmpty from 'lodash/isEmpty';

/**
 * Handle common message UI component prop logic including setting of image dimensions,
 * render booleans, and style resolving
 *
 * @param {MessageComponentBaseProps} props - message UI component props
 *   */

export default function useMessageProps(props, getCombinedStyle) {
  const { primaryButton, secondaryButton } = props;

  const hasPrimaryButton = !isEmpty(primaryButton);
  const hasSecondaryButton = !isEmpty(secondaryButton);
  const hasButtons = hasPrimaryButton || hasSecondaryButton;

  const styles = getCombinedStyle;

  return {
    hasButtons,
    hasPrimaryButton,
    hasSecondaryButton,
    styles,
  };
}
