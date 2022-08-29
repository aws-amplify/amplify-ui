import { ImageStyle } from 'react-native';

import { GetDefaultStyle } from '../../hooks';
import {
  BORDER_RADIUS_BASE,
  COLOR_LIGHT_GREY,
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
} from '../../constants';

import { FullScreenMessageStyle } from './types';

const commonStyles: Omit<FullScreenMessageStyle, 'image'> = {
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
  },
};

export const getPortraitStyles: GetDefaultStyle = (imageDimensions) => ({
  ...commonStyles,
  buttonsContainer: {
    ...commonStyles.buttonsContainer,
    marginTop: 'auto',
  },
  image: imageDimensions,
  textContainer: {
    ...commonStyles.textContainer,
    marginVertical: SPACING_LARGE,
  },
});

export const getLandscapeStyles: GetDefaultStyle = (imageDimensions) => ({
  ...commonStyles,
  contentContainer: {
    ...commonStyles.contentContainer,
    flexDirection: 'row',
  },
  image: { ...imageDimensions } as ImageStyle,
  imageContainer: {
    ...commonStyles.imageContainer,
    justifyContent: 'center',
  },
  textContainer: {
    ...commonStyles.textContainer,
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    ...commonStyles.wrapper,
    flex: 1,
  },
});
