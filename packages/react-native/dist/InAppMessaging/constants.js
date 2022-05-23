/**
 * Style constants either match or approximate the values used in the Pinpoint console preview.
 * Some values, such as spacing, are slightly different to allow for a more mobile friendly UX
 */
import { getLineHeight } from '../utils';
// color
export var COLOR_BLACK = '#000';
export var COLOR_GREY = '#a1a1a1';
export var COLOR_LIGHT_GREY = '#e8e8e8';
export var COLOR_LIGHT_GREY_2 = '#d8d8d8';
export var COLOR_WHITE = '#fff';
// spacing
export var SPACING_SMALL = 4;
export var SPACING_MEDIUM = 8;
export var SPACING_LARGE = 12;
export var SPACING_EXTRA_LARGE = 16;
// border radius
export var BORDER_RADIUS_BASE = 4;
// font
export var FONT_SIZE_BASE = 16;
export var FONT_SIZE_LARGE = 18;
export var LINE_HEIGHT_BASE = getLineHeight(FONT_SIZE_BASE);
export var LINE_HEIGHT_LARGE = getLineHeight(FONT_SIZE_LARGE);
export var FONT_WEIGHT_BASE = '400';
// icon
export var ICON_BUTTON_SIZE = 20;
export var ICON_BUTTON_HIT_SLOP = 10;
// shadow properties
// iOS shadow values
export var MESSAGE_SHADOW_HEIGHT = 2;
export var MESSAGE_SHADOW_WIDTH = 2;
export var MESSAGE_SHADOW_OPACITY = 0.1;
export var MESSAGE_SHADOW_RADIUS = 2;
// android shadow values
export var MESSAGE_ELEVATION = 3;
// component specific constants
// Message UI Buttons
// default value applied in React Native TouchableOpacity
export var BUTTON_PRESSED_OPACITY = 0.8;
