import React from 'react';

// import { Image, Text, View } from 'react-native';

import icons from '../assets';
import { Button, IconButton } from '../primitives';

import {
  ICON_BUTTON_HIT_SLOP,
  ICON_BUTTON_SIZE,
  IN_APP_MESSAGING_TEST_ID,
} from '../constants';

import { LayoutProps } from './types';

export default function MessageLayout({
  orientation,
  ...props
}: LayoutProps): JSX.Element {
  const {
    body,
    hasButtons,
    hasPrimaryButton,
    hasRenderableImage,
    hasSecondaryButton,
    header,
    image,
    onClose,
    primaryButton,
    secondaryButton,
    styles,
  } = props;

  const iconButton = (
    <a
      color={styles.iconButton.iconColor}
      onClick={onClose}
      // size={ICON_BUTTON_SIZE}
      href={icons.close}
      style={styles.iconButton.container}
      id={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
    />
  );

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        {orientation === 'portrait' && iconButton}
        {hasRenderableImage && (
          <div style={styles.imageContainer}>
            <img
              src={`{ uri: image?.src }`}
              style={styles.image}
              id={IN_APP_MESSAGING_TEST_ID.IMAGE}
            />
          </div>
        )}
        <div style={styles.textContainer}>
          {header?.content && (
            <div style={styles.header} id={IN_APP_MESSAGING_TEST_ID.HEADER}>
              {header.content}
            </div>
          )}
          {body?.content && (
            <div style={styles.body} id={IN_APP_MESSAGING_TEST_ID.BODY}>
              {body.content}
            </div>
          )}
        </div>
        {orientation === 'landscape' && iconButton}
      </div>
      {hasButtons && (
        <div style={styles.buttonsContainer}>
          {hasSecondaryButton && (
            <a
              onClick={secondaryButton?.onAction}
              style={styles.secondaryButton.container}
              id={IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON}
              // style={styles.secondaryButton.text}
            >
              {secondaryButton?.title}
            </a>
          )}
          {hasPrimaryButton && (
            <a
              onClick={primaryButton?.onAction}
              style={styles.primaryButton.container}
              id={IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON}
              // textStyle={styles.primaryButton.text}
            >
              {primaryButton?.title}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
