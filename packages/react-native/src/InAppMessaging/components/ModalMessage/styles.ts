import { ImageStyle, StyleSheet } from 'react-native';
import {
  BORDER_RADIUS_BASE,
  COLOR_BLACK,
  COLOR_LIGHT_GREY,
  COLOR_WHITE,
  FONT_SIZE_BASE,
  FONT_SIZE_LARGE,
  FONT_WEIGHT_BASE,
  FONT_WEIGHT_BOLD,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_LARGE,
  MESSAGE_ELEVATION,
  MESSAGE_SHADOW_HEIGHT,
  MESSAGE_SHADOW_OPACITY,
  MESSAGE_SHADOW_RADIUS,
  MESSAGE_SHADOW_WIDTH,
  SPACING_EXTRA_LARGE,
  SPACING_LARGE,
  SPACING_MEDIUM,
  SPACING_SMALL,
} from '../../constants';

import { ModalMessageStyle } from './types';

const commonStyles: Omit<
  ModalMessageStyle,
  'contentContainer' | 'image' | 'textContainer'
> = {
  body: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
    lineHeight: LINE_HEIGHT_BASE,
  },
  buttonContainer: {
    backgroundColor: COLOR_LIGHT_GREY,
    borderRadius: BORDER_RADIUS_BASE,
    flex: 1,
    margin: SPACING_MEDIUM,
    padding: SPACING_LARGE,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLOR_WHITE,
    elevation: MESSAGE_ELEVATION,
    margin: SPACING_EXTRA_LARGE,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: MESSAGE_SHADOW_WIDTH,
      height: MESSAGE_SHADOW_HEIGHT,
    },
    shadowOpacity: MESSAGE_SHADOW_OPACITY,
    shadowRadius: MESSAGE_SHADOW_RADIUS,
  },
  buttonText: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
    lineHeight: LINE_HEIGHT_BASE,
    textAlign: 'center',
  },
  header: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: LINE_HEIGHT_LARGE,
  },
  iconButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
  },
  imageContainer: {
    alignItems: 'center',
    margin: SPACING_LARGE,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
};

export const getPortraitStyles = (
  imageDimensions: ImageStyle
): ModalMessageStyle =>
  StyleSheet.create({
    ...commonStyles,
    buttonsContainer: {
      ...commonStyles.buttonsContainer,
      marginTop: 'auto',
      paddingHorizontal: SPACING_SMALL,
      paddingBottom: SPACING_SMALL,
    },
    container: {
      ...commonStyles.container,
      minHeight: '40%',
    },
    contentContainer: { padding: SPACING_LARGE },
    image: { ...imageDimensions },
    textContainer: {
      marginTop: SPACING_LARGE,
    },
  });

export const getLandscapeStyles = (
  imageDimensions: ImageStyle
): ModalMessageStyle =>
  StyleSheet.create({
    ...commonStyles,
    container: {
      ...commonStyles.container,
      flex: 1,
      padding: SPACING_EXTRA_LARGE,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    iconButton: {
      ...commonStyles.iconButton,
      marginRight: SPACING_MEDIUM,
    },
    image: { ...imageDimensions },
    imageContainer: {
      ...commonStyles.imageContainer,
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: SPACING_MEDIUM,
    },
  });
