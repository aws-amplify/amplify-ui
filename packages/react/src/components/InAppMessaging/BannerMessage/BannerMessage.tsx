import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Image } from '../../../primitives/Image';
import { Text } from '../../../primitives/Text';
import { CloseIconButton } from '../CloseIconButton';
import { useThemeBreakpoint } from '../../../hooks/useThemeBreakpoint';
import { useMessageProps } from '../hooks/useMessageProps';

export default function BannerMessage({
  alignment = 'right',
  body,
  container,
  header,
  image,
  layout,
  onClose,
  onDisplay,
  position = 'top',
  primaryButton,
  secondaryButton,
}): JSX.Element | null {
  const breakpoint = useThemeBreakpoint();

  const messageProps = useMessageProps({
    body,
    container,
    header,
    image,
    layout,
    onClose,
    onDisplay,
    primaryButton,
    secondaryButton,
  });

  const {
    hasPrimaryButton,
    hasSecondaryButton,
    hasRenderableImage,
    shouldRenderMessage,
  } = messageProps;

  if (!shouldRenderMessage) {
    return null;
  }

  return (
    <Flex
      className={`amplify-in-app-messaging-banner__container amplify-in-app-messaging-banner-${position} amplify-in-app-messaging-banner-${alignment} ${String(
        breakpoint
      )}`}
    >
      <Flex className="amplify-in-app-messaging-banner__content-container">
        {hasRenderableImage ? (
          <Flex className="amplify-in-app-messaging-banner__image-container">
            <Image
              src={image.src}
              className="amplify-in-app-messaging-banner__image"
              alt="Message Image"
            />
          </Flex>
        ) : null}
        <Flex className="amplify-in-app-messaging-banner__text-container">
          {header?.content ? <Heading>{header.content}</Heading> : null}
          {body?.content ? (
            <Text className="amplify-in-app-messaging-banner__body">
              {body.content}
            </Text>
          ) : null}
        </Flex>
        <CloseIconButton
          ariaLabel="Close"
          className="amplify-in-app-messaging-banner__close"
          onClick={onClose}
        />
      </Flex>
      {hasPrimaryButton || hasSecondaryButton ? (
        <Flex
          direction="row"
          className="amplify-in-app-messaging-banner__buttons-container"
        >
          {hasSecondaryButton ? (
            <Button
              onClick={secondaryButton.onAction}
              className="amplify-in-app-messaging-banner__button"
            >
              {secondaryButton.title}
            </Button>
          ) : null}
          {hasPrimaryButton ? (
            <Button
              onClick={primaryButton.onAction}
              className="amplify-in-app-messaging-banner__button"
            >
              {primaryButton.title}
            </Button>
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  );
}
