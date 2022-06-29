// import { GetDefaultStyle } from '../hooks';
import {
  BORDER_RADIUS_BASE,
  COLOR_BLACK,
  COLOR_LIGHT_GREY,
  COLOR_WHITE,
  FONT_SIZE_BASE,
  FONT_SIZE_LARGE,
  FONT_WEIGHT_BASE,
  MESSAGE_ELEVATION,
  MESSAGE_SHADOW_HEIGHT,
  MESSAGE_SHADOW_OPACITY,
  MESSAGE_SHADOW_RADIUS,
  MESSAGE_SHADOW_WIDTH,
  SPACING_EXTRA_LARGE,
  SPACING_LARGE,
  SPACING_MEDIUM,
  SPACING_SMALL,
} from '../constants';

export const getStyles = (additionalStyle?) => ({
  body: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
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
    padding: SPACING_SMALL,
  },
  buttonText: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
    textAlign: 'center',
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
    width: '33%',
    position: 'fixed',
    top: 0,
    right: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: SPACING_LARGE,
  },
  header: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: FONT_WEIGHT_BASE,
  },
  iconButton: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  image: {
    // ...imageDimensions,
  },
  imageContainer: {
    justifyContent: 'center',
    width: '10.5%',
    minWidth: '50px',
    maxWidth: '100px',
    padding: '5px',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: SPACING_MEDIUM,
  },
  wrapper: {
    display: 'flex',
    alignSelf: 'top',
    backgroundColor: 'transparent',
    flex: 1,
  },
});
