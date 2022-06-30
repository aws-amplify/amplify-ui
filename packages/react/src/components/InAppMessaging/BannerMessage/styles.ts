import {
  FONT_SIZE_BASE,
  FONT_SIZE_LARGE,
  FONT_WEIGHT_BASE,
  SPACING_EXTRA_LARGE,
  SPACING_SMALL,
} from '../constants';

export const getStyles = (overrideStyles, layout, additionalStyle?) => ({
  body: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
    color: overrideStyles.body.color ? overrideStyles.body.color : 'initial',
    textAlign: overrideStyles.body.textAlign
      ? overrideStyles.body.textAlign
      : 'initial',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: SPACING_SMALL,
  },
  buttonText: {
    fontSize: FONT_SIZE_BASE,
    fontWeight: FONT_WEIGHT_BASE,
    textAlign: 'center',
  },
  container: {
    backgroundColor: overrideStyles.container.backgroundColor
      ? overrideStyles.container.backgroundColor
      : 'white',
    margin: SPACING_EXTRA_LARGE,
    boxShadow: '2px 2px 9px 3px rgb(0, 0, 0, .1)',
    padding: '16px',
    position: 'fixed',
    right: 0,
    top:
      layout === ('TOP_BANNER' || 'MIDDLE_BANNER')
        ? layout === 'TOP_BANNER'
          ? 0
          : '40%'
        : 'initial',
    bottom: layout === 'BOTTOM_BANNER' ? 0 : 'initial',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: '0 12px',
  },
  header: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: '800',
    color: overrideStyles.header.color
      ? overrideStyles.header.color
      : 'default',
    textAlign: overrideStyles.header.textAlign
      ? overrideStyles.header.textAlign
      : 'default',
  },
  icon: {
    color: overrideStyles.body.color,
  },
  image: {
    objectFit: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    width: '15%',
    minWidth: '50px',
    maxWidth: '100px',
    padding: '5px',
  },
  textContainer: {
    flex: 1,
    margin: '15px 0 15px 15px',
  },

  wrapper: {
    display: 'flex',
    alignSelf: 'top',
    backgroundColor: 'transparent',
    flex: 1,
  },
  primaryButton: {
    width: '100%',
    borderStyle: 'none',
    ...overrideStyles.primaryButton,
  },
  secondaryButton: {
    width: '100%',
    borderStyle: 'none',
    ...overrideStyles.secondaryButton,
  },
});
