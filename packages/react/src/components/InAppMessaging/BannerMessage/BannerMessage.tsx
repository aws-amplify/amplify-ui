import isEmpty from 'lodash/isEmpty';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { IconClose } from '../../../primitives/Icon/icons/IconClose';
import { Image } from '../../../primitives/Image';
import { Text } from '../../../primitives/Text';
import { Link } from '../../../primitives/Link';

export default function BannerMessage({
  alignment = 'right',
  ...props
}): JSX.Element | null {
  const {
    body,
    header,
    image,
    onClose,
    position,
    primaryButton,
    secondaryButton,
  } = props;

  const hasPrimaryButton = !isEmpty(primaryButton);
  const hasSecondaryButton = !isEmpty(secondaryButton);

  return (
    <Flex
      className={`amplify-in-app-messaging-banner__container amplify-in-app-messaging-banner__${position}`}
    >
      <Flex className="amplify-in-app-messaging-banner__content-container">
        {image?.src ? (
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
        <Link>
          <IconClose ariaLabel="Close" onClick={onClose} />
        </Link>
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
