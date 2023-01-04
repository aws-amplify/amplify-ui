import { getLineHeight } from '../utils';

// color
export const COLOR_BLACK = '#000';
export const COLOR_GREY = '#a1a1a1';
export const COLOR_LIGHT_GREY = '#e8e8e8';
export const COLOR_LIGHT_GREY_2 = '#d8d8d8';
export const COLOR_WHITE = '#fff';

// spacing
export const SPACING_SMALL = 4;
export const SPACING_MEDIUM = 8;
export const SPACING_LARGE = 12;
export const SPACING_EXTRA_LARGE = 16;

// border radius
export const BORDER_RADIUS_BASE = 4;

// font
export const FONT_SIZE_BASE = 16;
export const FONT_SIZE_LARGE = 18;

export const LINE_HEIGHT_BASE = getLineHeight(FONT_SIZE_BASE);
export const LINE_HEIGHT_LARGE = getLineHeight(FONT_SIZE_LARGE);

export const FONT_WEIGHT_BASE = '400';
export const FONT_WEIGHT_BOLD = '600';

// icon
export const ICON_BUTTON_SIZE = 20;
export const ICON_BUTTON_HIT_SLOP = 10;

// shadow properties

// iOS shadow values
export const MESSAGE_SHADOW_HEIGHT = 2;
export const MESSAGE_SHADOW_WIDTH = 2;
export const MESSAGE_SHADOW_OPACITY = 0.1;
export const MESSAGE_SHADOW_RADIUS = 2;

// android shadow values
export const MESSAGE_ELEVATION = 3;

// Message UI Buttons

// default value applied in React Native TouchableOpacity
export const BUTTON_PRESSED_OPACITY = 0.8;

// Message Component Test IDs
export const IN_APP_MESSAGING_TEST_ID = {
  BODY: 'in-app-messaging--body',
  CLOSE_BUTTON: 'in-app-messaging--close-button',
  HEADER: 'in-app-messaging--header',
  IMAGE: 'in-app-messaging--image',
  PRIMARY_BUTTON: 'in-app-messaging--primary-button',
  SECONDARY_BUTTON: 'in-app-messaging--secondary-button',
  CAROUSEL: 'in-app-messaging--carousel',
};
