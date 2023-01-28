import * as React from 'react';
import classNames from 'classnames';

import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Text,
} from '../../../primitives';
import { CloseIconButton } from '../CloseIconButton';
import {
  BLOCK_CLASS,
  BODY_TEXT_TEST_ID,
  BUTTON_CLASS,
  CLOSE_BUTTON_CLASS,
  CONTENT_CLASS,
  CONTENT_TEST_ID,
  HEADER_CLASS,
  HEADER_TEXT_TEST_ID,
  IMAGE_CONTAINER_CLASS,
  IMAGE_CONTAINER_TEST_ID,
  MESSAGE_LAYOUT_TEST_ID,
  TEXT_CONTAINER_CLASS,
  TEXT_CONTAINER_TEST_ID,
} from './constants';
import { MessageLayoutProps } from './types';
import { getButtonModifier } from './utils';

export function MessageLayout({
  body,
  buttonSize,
  hasButtons,
  hasPrimaryButton,
  hasRenderableImage,
  hasSecondaryButton,
  header,
  image,
  onClose,
  orientation = 'vertical',
  primaryButton,
  secondaryButton,
  styles,
}: MessageLayoutProps): JSX.Element {
  const buttonModifiers = React.useMemo(
    () => ({
      primary: getButtonModifier(styles.primaryButton),
      secondary: getButtonModifier(styles.secondaryButton),
    }),
    [styles]
  );
  const isHorizontal = orientation === 'horizontal';
  const closeButton = (
    <CloseIconButton
      className={CLOSE_BUTTON_CLASS}
      onClick={onClose}
      style={styles.closeIconButton}
    />
  );

  return (
    <Flex
      className={BLOCK_CLASS}
      data-testid={MESSAGE_LAYOUT_TEST_ID}
      style={styles.container}
    >
      {!isHorizontal && <Flex justifyContent="flex-end">{closeButton}</Flex>}
      <Flex
        className={classNames(
          CONTENT_CLASS,
          `${CONTENT_CLASS}--${orientation}`
        )}
        data-testid={CONTENT_TEST_ID}
      >
        {hasRenderableImage && (
          <Flex
            className={classNames(
              IMAGE_CONTAINER_CLASS,
              `${IMAGE_CONTAINER_CLASS}--${orientation}`
            )}
            data-testid={IMAGE_CONTAINER_TEST_ID}
          >
            <Image
              alt="In-App Message Image"
              src={image.src}
              style={styles.image}
            />
          </Flex>
        )}
        <Flex
          className={classNames(
            TEXT_CONTAINER_CLASS,
            `${TEXT_CONTAINER_CLASS}--${orientation}`
          )}
          data-testid={TEXT_CONTAINER_TEST_ID}
        >
          {header?.content && (
            <Heading
              className={HEADER_CLASS}
              isTruncated
              level={2}
              style={styles.header}
              testId={HEADER_TEXT_TEST_ID}
            >
              {header.content}
            </Heading>
          )}
          {body?.content && (
            <Text style={styles.body} testId={BODY_TEXT_TEST_ID}>
              {body.content}
            </Text>
          )}
        </Flex>
        {isHorizontal && <Flex alignItems="flex-start">{closeButton}</Flex>}
      </Flex>
      {hasButtons && (
        <ButtonGroup size={buttonSize}>
          {hasSecondaryButton && (
            <Button
              className={classNames(
                BUTTON_CLASS,
                `${BUTTON_CLASS}--${buttonModifiers.secondary}`
              )}
              onClick={secondaryButton?.onAction}
              style={styles.secondaryButton}
            >
              {secondaryButton.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              className={classNames(
                BUTTON_CLASS,
                `${BUTTON_CLASS}--${buttonModifiers.primary}`
              )}
              onClick={primaryButton?.onAction}
              style={styles.primaryButton}
            >
              {primaryButton.title}
            </Button>
          )}
        </ButtonGroup>
      )}
    </Flex>
  );
}
