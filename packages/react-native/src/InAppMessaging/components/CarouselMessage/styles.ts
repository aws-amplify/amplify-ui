import { ImageStyle, StyleSheet } from 'react-native';
import {
  BORDER_RADIUS_BASE,
  COLOR_GREY,
  COLOR_LIGHT_GREY,
  COLOR_LIGHT_GREY_2,
  COLOR_WHITE,
  FONT_SIZE_BASE,
  FONT_SIZE_LARGE,
  FONT_WEIGHT_BASE,
  FONT_WEIGHT_BOLD,
  LINE_HEIGHT_BASE,
  LINE_HEIGHT_LARGE,
  SPACING_EXTRA_LARGE,
  SPACING_LARGE,
  SPACING_MEDIUM,
  SPACING_SMALL,
} from '../../constants';

import { CarouselMessageStyle, CarouselMessageComponentStyle } from './types';

export const defaultStyle: CarouselMessageComponentStyle = StyleSheet.create({
  pageIndicatorActive: {
    backgroundColor: COLOR_GREY,
    borderRadius: SPACING_LARGE / 2,
    height: SPACING_LARGE,
    margin: SPACING_SMALL,
    width: SPACING_LARGE,
  },
  pageIndicatorInactive: {
    backgroundColor: COLOR_LIGHT_GREY_2,
    borderRadius: SPACING_LARGE / 2,
    height: SPACING_LARGE,
    margin: SPACING_SMALL,
    width: SPACING_LARGE,
  },
});

const commonStyles: Omit<CarouselMessageStyle, 'image'> = {
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
  buttonText: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
    lineHeight: LINE_HEIGHT_BASE,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: SPACING_EXTRA_LARGE,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: LINE_HEIGHT_LARGE,
  },
  iconButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING_MEDIUM,
    marginLeft: 'auto',
    marginRight: SPACING_MEDIUM,
  },
  imageContainer: {
    alignItems: 'center',
    margin: SPACING_LARGE,
  },
  textContainer: {
    paddingHorizontal: SPACING_MEDIUM,
  },
  wrapper: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
  },
};

export const getPortraitStyles = (
  imageDimensions: ImageStyle
): CarouselMessageStyle =>
  StyleSheet.create({
    ...commonStyles,
    image: { ...imageDimensions },
    textContainer: {
      ...commonStyles.textContainer,
      marginVertical: SPACING_LARGE,
    },
  });

export const getLandscapeStyles = (
  imageDimensions: ImageStyle
): CarouselMessageStyle =>
  StyleSheet.create({
    ...commonStyles,
    contentContainer: {
      ...commonStyles.contentContainer,
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    image: { ...imageDimensions },
    imageContainer: {
      ...commonStyles.imageContainer,
      justifyContent: 'center',
    },
    textContainer: {
      ...commonStyles.textContainer,
      flex: 1,
      justifyContent: 'center',
    },
  });
