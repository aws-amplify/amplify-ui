import React from 'react';

import { Image, Text, View } from 'react-native';

import { icons } from '../../../assets';
import { Button, IconButton } from '../../../primitives';

import {
  ICON_BUTTON_HIT_SLOP,
  ICON_BUTTON_SIZE,
  IN_APP_MESSAGING_TEST_ID,
} from '../../constants';

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
    testID,
  } = props;

  const iconButton = (
    <IconButton
      color={styles.iconButton.iconColor}
      hitSlop={ICON_BUTTON_HIT_SLOP}
      onPress={onClose}
      size={ICON_BUTTON_SIZE}
      source={icons.close}
      style={styles.iconButton.container}
      testID={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
    />
  );

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.contentContainer}>
        {orientation === 'portrait' && iconButton}
        {hasRenderableImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image?.src }}
              style={styles.image}
              testID={IN_APP_MESSAGING_TEST_ID.IMAGE}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          {header?.content && (
            <Text
              style={styles.header}
              testID={IN_APP_MESSAGING_TEST_ID.HEADER}
            >
              {header.content}
            </Text>
          )}
          {body?.content && (
            <Text style={styles.body} testID={IN_APP_MESSAGING_TEST_ID.BODY}>
              {body.content}
            </Text>
          )}
        </View>
        {orientation === 'landscape' && iconButton}
      </View>
      {hasButtons && (
        <View style={styles.buttonsContainer}>
          {hasSecondaryButton && (
            <Button
              onPress={secondaryButton?.onAction}
              style={styles.secondaryButton.container}
              testID={IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON}
              textStyle={styles.secondaryButton.text}
            >
              {secondaryButton?.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              onPress={primaryButton?.onAction}
              style={styles.primaryButton.container}
              testID={IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON}
              textStyle={styles.primaryButton.text}
            >
              {primaryButton?.title}
            </Button>
          )}
        </View>
      )}
    </View>
  );
}
