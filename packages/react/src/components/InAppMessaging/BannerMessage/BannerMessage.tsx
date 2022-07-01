import {
  Heading,
  Icon,
  Image,
  Text,
  View,
  Button,
  Flex,
} from '@aws-amplify/ui-react';

import '../../../../src/styles.css';

export default function BannerMessage({
  position = 'top',
  ...props
}): JSX.Element | null {
  const {
    body,
    header,
    image,
    layout,
    onClose,
    primaryButton,
    secondaryButton,
  } = props;

  const hasPrimaryButton = primaryButton.title && primaryButton.title != '';
  const hasSecondaryButton =
    secondaryButton.title && secondaryButton.title != '';

  return (
    <Flex className={`container ${layout}`}>
      <Flex className="contentContainer">
        <View className="imageContainer">
          <Image src={image.src} className="image" alt="Message Image" />
        </View>
        <Flex className="textContainer">
          {header?.content && <Heading>{header.content}</Heading>}
          {body?.content && <Text className="body">{body.content}</Text>}
        </Flex>
        <Icon
          ariaLabel="Close"
          onClick={onClose}
          pathData="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
          className="icon"
        />
      </Flex>
      {(hasPrimaryButton || hasSecondaryButton) && (
        <Flex direction="row" className="buttonsContainer">
          {hasSecondaryButton && (
            <Button onClick={secondaryButton?.onAction} className="button">
              {secondaryButton?.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button onClick={primaryButton?.onAction} className="button">
              {primaryButton?.title}
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
}
