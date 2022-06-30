import { useState } from 'react';

import { Button, Flex, Icon, Image, Text } from '../../../primitives';

import { IN_APP_MESSAGING_TEST_ID } from '../constants';

export default function MessageLayout({ ...props }): JSX.Element {
  const {
    body,
    container,
    hasButtons,
    hasPrimaryButton,
    hasSecondaryButton,
    header,
    image,
    layout,
    onClose,
    primaryButton,
    secondaryButton,
    styles,
  } = props;

  const iconButton = (
    <Flex testId={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON} onClick={onClose}>
      <Icon
        ariaLabel="Close"
        pathData="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
        color={styles.icon.color}
      />
    </Flex>
  );

  const [hover, setHover] = useState(false);
  let hoveringOn;

  return (
    <Flex style={styles.container} direction="column">
      <Flex style={styles.contentContainer} direction="row">
        <Flex style={styles.imageContainer}>
          <Image
            src={image.src}
            style={styles.image}
            testId={IN_APP_MESSAGING_TEST_ID.IMAGE}
            alt="Close"
          />
        </Flex>
        <Flex style={styles.textContainer} direction="column">
          {header?.content && (
            <Text
              style={styles.header}
              testId={IN_APP_MESSAGING_TEST_ID.HEADER}
            >
              {header.content}
            </Text>
          )}
          {body?.content && (
            <Text style={styles.body} testId={IN_APP_MESSAGING_TEST_ID.BODY}>
              {body.content}
            </Text>
          )}
        </Flex>
        {iconButton}
      </Flex>
      {hasButtons && (
        <Flex direction="row" style={styles.buttonsContainer}>
          {hasSecondaryButton && (
            <Button
              onClick={secondaryButton?.onAction}
              id="Secondary Button"
              testId={IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON}
              style={styles.secondaryButton}
            >
              {secondaryButton?.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              onClick={primaryButton?.onAction}
              testId={IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON}
              id="Primary Button"
              style={styles.primaryButton}
            >
              {primaryButton?.title}
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
}
