var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import { StyleSheet } from 'react-native';
import { DEFAULT_CAROUSEL_INDICATOR_SIZE } from '../../../primitives';
import { BUTTON_PRESSED_OPACITY, SPACING_EXTRA_LARGE } from '../../constants';
// Carousel page indicator size + margins
var DEFAULT_CAROUSEL_INDICATOR_PADDING =
  (DEFAULT_CAROUSEL_INDICATOR_SIZE * 5) / 3;
/**
 * Parse and assign appropriate button container and text style from style objects params
 *
 * @param {MessageButtonStyleParams} params - message styleParams and button type
 * @returns {MessageButtonStyleProps} resolved button container and text style arrays
 */
export var getComponentButtonStyle = function (_a) {
  var _b, _c;
  var styleParams = _a.styleParams,
    buttonType = _a.buttonType;
  var defaultStyle = styleParams.defaultStyle,
    payloadStyle = styleParams.payloadStyle,
    overrideStyle = styleParams.overrideStyle;
  // default component styles defined at the UI component level
  var _d = defaultStyle !== null && defaultStyle !== void 0 ? defaultStyle : {},
    _e = _d.buttonContainer,
    containerDefaultStyle = _e === void 0 ? {} : _e,
    _f = _d.buttonText,
    textDefaultStyle = _f === void 0 ? {} : _f;
  // message specific styles in the in-app message payload, overrides default component styles
  var _g =
      (_b =
        payloadStyle === null || payloadStyle === void 0
          ? void 0
          : payloadStyle[buttonType]) !== null && _b !== void 0
        ? _b
        : {},
    backgroundColor = _g.backgroundColor,
    borderRadius = _g.borderRadius,
    color = _g.color;
  var containePayloadStyle = __assign(
    __assign({}, backgroundColor ? { backgroundColor: backgroundColor } : null),
    borderRadius ? { borderRadius: borderRadius } : null
  );
  var textMessageStyle = __assign({}, color ? { color: color } : null);
  // custom component override styles passed as style prop, overrides all previous styles
  var _h =
      (_c =
        overrideStyle === null || overrideStyle === void 0
          ? void 0
          : overrideStyle[buttonType]) !== null && _c !== void 0
        ? _c
        : {},
    _j = _h.container,
    containerOverrideStyle = _j === void 0 ? {} : _j,
    _k = _h.text,
    textOverrideStyle = _k === void 0 ? {} : _k;
  return {
    // the style prop of the React Native Pressable component used in the message UI accepts either a ViewStyle array
    // or a function receiving a boolean reflecting whether the component is currently pressed, returning a ViewStyle
    // array. Utilizing the latter, we add an opacity value to the UI message button style during press events
    container: function (_a) {
      var _b = _a === void 0 ? { pressed: false } : _a,
        pressed = _b.pressed;
      // default button press interaction opacity
      var pressedOpacity = pressed ? { opacity: BUTTON_PRESSED_OPACITY } : {};
      // pass `pressed` to containerOverrideStyle and evaluate if the consumer passed a function for custom
      // button style
      var containerOverrideFinalStyle =
        typeof containerOverrideStyle === 'function'
          ? containerOverrideStyle({ pressed: pressed })
          : containerOverrideStyle;
      return [
        pressedOpacity,
        containerDefaultStyle,
        containePayloadStyle,
        containerOverrideFinalStyle,
      ];
    },
    text: [textDefaultStyle, textMessageStyle, textOverrideStyle],
  };
};
/**
 * Utility for determining if the provided layout, orientation or layout/orientation combination requires filling the
 * entire device screen.
 *
 * @param {InAppMessageLayout} layout - message layout
 * @param {DeviceOrientation} orientation - device orientation
 * @returns {Boolean} boolean indicating whether entire screen should be filled
 */
export var shouldFillDeviceScreen = function (layout, orientation) {
  switch (layout) {
    case 'CAROUSEL':
    case 'FULL_SCREEN': {
      return true;
    }
    case 'MODAL': {
      // is this correct actually?
      return orientation === 'landscape';
    }
    case 'TOP_BANNER':
    case 'MIDDLE_BANNER':
    case 'BOTTOM_BANNER':
    default: {
      return false;
    }
  }
};
/**
 * Parse and assign appropriate message container and wrapper style from style params
 *
 * @param {MessageStyleParams} params - message styleParams, layout, and device orientation
 * @returns {ContainerAndWrapperStyle} resolved containerStyle and wrapperStyle
 */
export var getContainerAndWrapperStyle = function (_a) {
  var _b, _c, _d, _e;
  var styleParams = _a.styleParams,
    layout = _a.layout,
    orientation = _a.orientation;
  var defaultStyle = styleParams.defaultStyle,
    payloadStyle = styleParams.payloadStyle,
    overrideStyle = styleParams.overrideStyle;
  var containerDefaultStyle =
    (_b =
      defaultStyle === null || defaultStyle === void 0
        ? void 0
        : defaultStyle.container) !== null && _b !== void 0
      ? _b
      : {};
  var containerPayloadStyle =
    (_c =
      payloadStyle === null || payloadStyle === void 0
        ? void 0
        : payloadStyle.container) !== null && _c !== void 0
      ? _c
      : {};
  var containerOverrideStyle =
    (_d =
      overrideStyle === null || overrideStyle === void 0
        ? void 0
        : overrideStyle.container) !== null && _d !== void 0
      ? _d
      : {};
  var wrapperDefaultStyle =
    (_e =
      defaultStyle === null || defaultStyle === void 0
        ? void 0
        : defaultStyle.wrapper) !== null && _e !== void 0
      ? _e
      : {};
  if (!shouldFillDeviceScreen(layout, orientation)) {
    return {
      wrapper: wrapperDefaultStyle,
      container: [
        containerDefaultStyle,
        containerPayloadStyle,
        containerOverrideStyle,
      ],
    };
  }
  // in non-banner and landscape modal layouts container backgroundColor values should be applied as
  // wrapper style to ensure that the backgroundColor is applied to the entire screen
  var defaultBackgroundColor = containerDefaultStyle.backgroundColor,
    restContainerDefaultStyle = __rest(containerDefaultStyle, [
      'backgroundColor',
    ]);
  var messageBackgroundColor = containerPayloadStyle.backgroundColor,
    restContainerPayloadStyle = __rest(containerPayloadStyle, [
      'backgroundColor',
    ]);
  // flatten overrideStyle to access override backgroundColor
  var _f = StyleSheet.flatten(containerOverrideStyle),
    overrideBackgroundColor = _f.backgroundColor,
    restContainerOverrideStyle = __rest(_f, ['backgroundColor']);
  // all non-backgroundColor container override style are applied to the container View
  var container = [
    restContainerDefaultStyle,
    restContainerPayloadStyle,
    restContainerOverrideStyle,
  ];
  // use ternaries to prevent passing backgroundColor object with undefined or null value
  var wrapper = [
    wrapperDefaultStyle,
    defaultBackgroundColor ? { backgroundColor: defaultBackgroundColor } : {},
    messageBackgroundColor ? { backgroundColor: messageBackgroundColor } : {},
    overrideBackgroundColor ? { backgroundColor: overrideBackgroundColor } : {},
  ];
  return { wrapper: wrapper, container: container };
};
/**
 * Utility for extracting message payload style
 *
 * @param {MessageComponentBaseProps} props - message props
 * @returns {Object} message payload specific style
 */
export var getPayloadStyle = function (_a) {
  var _b, _c, _d, _e, _f;
  var body = _a.body,
    container = _a.container,
    header = _a.header,
    primaryButton = _a.primaryButton,
    secondaryButton = _a.secondaryButton;
  return {
    body:
      (_b = body === null || body === void 0 ? void 0 : body.style) !== null &&
      _b !== void 0
        ? _b
        : {},
    container:
      (_c =
        container === null || container === void 0
          ? void 0
          : container.style) !== null && _c !== void 0
        ? _c
        : {},
    header:
      (_d = header === null || header === void 0 ? void 0 : header.style) !==
        null && _d !== void 0
        ? _d
        : {},
    primaryButton:
      (_e =
        primaryButton === null || primaryButton === void 0
          ? void 0
          : primaryButton.style) !== null && _e !== void 0
        ? _e
        : {},
    secondaryButton:
      (_f =
        secondaryButton === null || secondaryButton === void 0
          ? void 0
          : secondaryButton.style) !== null && _f !== void 0
        ? _f
        : {},
  };
};
/**
 * Receives message styling and returns style property values for use with in-app message
 * UI components. Handles resolvement style precedence between default, payload, and custom style
 *
 * Style param resolve precedence from lowest to highest:
 *   1. defaultStyle
 *   2. messageStyle
 *   3. overrideStyle
 *
 * @param {MessageStyleParams} params - message style params, layout, and device orientation
 * @returns {MessageStyles} message style props
 */
export function getMessageStyles(_a) {
  var styleParams = _a.styleParams,
    layout = _a.layout,
    orientation = _a.orientation;
  // view style applied to the wrapper and primary container views
  var _b = getContainerAndWrapperStyle({
      styleParams: styleParams,
      layout: layout,
      orientation: orientation,
    }),
    wrapper = _b.wrapper,
    container = _b.container;
  // primary and secondary button container and text style
  var primaryButton = getComponentButtonStyle({
    styleParams: styleParams,
    buttonType: 'primaryButton',
  });
  var secondaryButton = getComponentButtonStyle({
    styleParams: styleParams,
    buttonType: 'secondaryButton',
  });
  var defaultStyle = styleParams.defaultStyle,
    payloadStyle = styleParams.payloadStyle,
    overrideStyle = styleParams.overrideStyle;
  // image style composed of default and override style
  var image = [
    defaultStyle === null || defaultStyle === void 0
      ? void 0
      : defaultStyle.image,
    overrideStyle === null || overrideStyle === void 0
      ? void 0
      : overrideStyle.image,
  ];
  var iconButton = {
    // view style applied to icon button
    container: [
      defaultStyle === null || defaultStyle === void 0
        ? void 0
        : defaultStyle.iconButton,
      overrideStyle === null || overrideStyle === void 0
        ? void 0
        : overrideStyle.closeIconButton,
    ],
    // close icon color, only specified as an overrideStyle
    iconColor:
      overrideStyle === null || overrideStyle === void 0
        ? void 0
        : overrideStyle.closeIconColor,
  };
  // text style applied to message body and header respectively
  var body = [
    defaultStyle === null || defaultStyle === void 0
      ? void 0
      : defaultStyle.body,
    payloadStyle === null || payloadStyle === void 0
      ? void 0
      : payloadStyle.body,
    overrideStyle === null || overrideStyle === void 0
      ? void 0
      : overrideStyle.body,
  ];
  var header = [
    defaultStyle === null || defaultStyle === void 0
      ? void 0
      : defaultStyle.header,
    payloadStyle === null || payloadStyle === void 0
      ? void 0
      : payloadStyle.header,
    overrideStyle === null || overrideStyle === void 0
      ? void 0
      : overrideStyle.header,
  ];
  var _c = defaultStyle !== null && defaultStyle !== void 0 ? defaultStyle : {},
    buttonsContainer = _c.buttonsContainer,
    contentContainer = _c.contentContainer,
    imageContainer = _c.imageContainer,
    textContainer = _c.textContainer;
  var styleProps = {
    body: body,
    buttonsContainer: buttonsContainer,
    wrapper: wrapper,
    contentContainer: contentContainer,
    container: container,
    header: header,
    iconButton: iconButton,
    image: image,
    imageContainer: imageContainer,
    primaryButton: primaryButton,
    secondaryButton: secondaryButton,
    textContainer: textContainer,
  };
  if (layout === 'CAROUSEL') {
    styleProps.container = [
      styleProps.container,
      // Add bottom padding for carousel page indicators
      {
        paddingBottom: SPACING_EXTRA_LARGE + DEFAULT_CAROUSEL_INDICATOR_PADDING,
      },
    ];
  }
  return styleProps;
}
