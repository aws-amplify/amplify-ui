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
  blockClass,
  buttonClass,
  closeButtonClass,
  CONTENT_TEST_ID,
  contentClass,
  headerClass,
  IMAGE_CONTAINER_TEST_ID,
  imageContainerClass,
  MESSAGE_LAYOUT_TEST_ID,
  TEXT_CONTAINER_TEST_ID,
  textContainerClass,
} from './constants';
import { MessageLayoutProps } from './types';
import { getButtonModifier } from './utils';

export function MessageLayout({
  body,
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
      className={closeButtonClass}
      onClick={onClose}
      style={styles.closeIconButton}
    />
  );

  return (
    <Flex
      className={blockClass}
      data-testid={MESSAGE_LAYOUT_TEST_ID}
      style={styles.container}
    >
      {!isHorizontal && <Flex justifyContent="flex-end">{closeButton}</Flex>}
      <Flex
        className={classNames(contentClass, `${contentClass}--${orientation}`)}
        data-testid={CONTENT_TEST_ID}
      >
        {hasRenderableImage && (
          <Flex
            className={classNames(
              imageContainerClass,
              `${imageContainerClass}--${orientation}`
            )}
            data-testid={IMAGE_CONTAINER_TEST_ID}
          >
            <Image
              alt="In-App Message Image"
              src={image?.src}
              style={styles.image}
            />
          </Flex>
        )}
        <Flex
          className={classNames(
            textContainerClass,
            `${textContainerClass}--${orientation}`
          )}
          data-testid={TEXT_CONTAINER_TEST_ID}
        >
          {header?.content && (
            <Heading
              className={headerClass}
              isTruncated
              level={2}
              style={styles.header}
            >
              {header.content}
            </Heading>
          )}
          {body?.content && <Text style={styles.body}>{body.content}</Text>}
        </Flex>
        {isHorizontal && <Flex alignItems="flex-start">{closeButton}</Flex>}
      </Flex>
      {hasButtons && (
        <ButtonGroup>
          {hasSecondaryButton && (
            <Button
              className={classNames(
                buttonClass,
                `${buttonClass}--${buttonModifiers.primary}`
              )}
              onClick={secondaryButton?.onAction}
              style={styles.secondaryButton}
            >
              {secondaryButton?.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              className={classNames(
                buttonClass,
                `${buttonClass}--${buttonModifiers.secondary}`
              )}
              onClick={primaryButton?.onAction}
              style={styles.primaryButton}
            >
              {primaryButton?.title}
            </Button>
          )}
        </ButtonGroup>
      )}
    </Flex>
  );
}
