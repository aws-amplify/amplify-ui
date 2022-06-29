import React from 'react';

// import { Image, Text, View } from 'react-native';

import icons from '../assets';
import { Button, Image, Flex, Text, View } from '../../../primitives';

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

  const iconButton = (
    <div
      // style={containerStyle}
      id={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
      // style={styles.iconButton.container[0]}
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
    <View
    // style={{...styles.container[0], ...styles.container[1], ...styles.container[2]}}
    >
      <View
      // style={styles.contentContainer}
      >
        {iconButton}
        {hasRenderableImage && (
          <View style={styles.imageContainer}>
            <Image
              src={image?.src}
              // style={{...styles.image[0], ...styles.image[1]}}
              testId={IN_APP_MESSAGING_TEST_ID.IMAGE}
              alt="Close Button"
            />
          </View>
        )}
        <View
        // style={styles.textContainer}
        >
          {header?.content && (
            <Text
              // style={{...styles.header[0],
              //         ...styles.header[1],
              //         ...styles.header[2]}}
              testId={IN_APP_MESSAGING_TEST_ID.HEADER}
            >
              {header.content}
            </Text>
          )}
          {body?.content && (
            <Text
              // style={{...styles.body[0],
              //         ...styles.body[1],
              //         ...styles.body[2]}}
              testId={IN_APP_MESSAGING_TEST_ID.BODY}
            >
              {body.content}
            </Text>
          )}
        </View>
      </View>
      {hasButtons && (
        <View>
          {hasSecondaryButton && (
            <Button
              onClick={secondaryButton?.onAction}
              // style={{...styles.secondaryButton.text[0],
              //         ...styles.secondaryButton.text[1],
              //         ...styles.secondaryButton.text[2]}}
              testId={IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON}
            >
              {secondaryButton?.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              onClick={primaryButton?.onAction}
              // style={{...styles.primaryButton.text[0],
              //   ...styles.primaryButton.text[1],
              //   ...styles.primaryButton.text[2]}}
              testId={IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON}
            >
              {primaryButton?.title}
            </Button>
          )}
        </View>
      )}
    </View>
  );
}
