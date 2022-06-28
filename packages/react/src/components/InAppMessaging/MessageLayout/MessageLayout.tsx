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
import { useMessage } from '@aws-amplify/ui-react-core';
import { Content } from '@radix-ui/react-tabs';

export default function MessageLayout({ ...props }: LayoutProps): JSX.Element {
  console.log('props', props);
  console.log('usemessage', useMessage);
  const {
    body,
    container,
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

  console.log('body', body);
  console.log('hasButtons', hasButtons);
  console.log('header', header);
  console.log('image', image);
  console.log('primaryButton', primaryButton);
  console.log('styles', styles);

  const iconButton = (
    <div
      // style={containerStyle}
      id={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
      style={styles.iconButton.container[0]}
      onClick={onClose}
    >
      <img src={icons.close} />
      {/* <button
        // style={styles.b}
        // color={styles.iconButton.iconColor}
        // size={ICON_BUTTON_SIZE}
        // style="color:red"
        // id={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
      /> */}
    </div>
  );

  return (
    <div style={styles.container[0]}>
      <div style={styles.contentContainer}>
        {iconButton}
        {hasRenderableImage && (
          <div style={styles.imageContainer}>
            <img
              src={image?.src}
              style={styles.image[0]}
              id={IN_APP_MESSAGING_TEST_ID.IMAGE}
            />
          </div>
        )}
        <div
        // style={styles.header[0]}
        >
          {header?.content && (
            <div style={styles.header[0]} id={IN_APP_MESSAGING_TEST_ID.HEADER}>
              {header.content}
            </div>
          )}
          {body?.content && (
            <div style={styles.body[0]} id={IN_APP_MESSAGING_TEST_ID.BODY}>
              {body.content}
            </div>
          )}
        </div>
        {iconButton}
      </div>
      {hasButtons && (
        <div style={styles.buttonsContainer}>
          {hasSecondaryButton && (
            <button
              onClick={secondaryButton?.onAction}
              style={styles.secondaryButton.text[0]}
              id={IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON}
              // style={styles.secondaryButton.text}
            >
              {secondaryButton?.title}
            </button>
          )}
          {hasPrimaryButton && (
            <button
              onClick={primaryButton?.onAction}
              style={styles.primaryButton.text[0]}
              id={IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON}
              // textStyle={styles.primaryButton.text}
            >
              {primaryButton?.title}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
