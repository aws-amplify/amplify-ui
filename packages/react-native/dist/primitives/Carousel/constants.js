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
export var DEFAULT_CAROUSEL_COLOR_ACTIVE = '#a1a1a1';
export var DEFAULT_CAROUSEL_COLOR_INACTIVE = '#d8d8d8';
export var DEFAULT_CAROUSEL_INDICATOR_SIZE = 12;
var DEFAULT_CAROUSEL_INDICATOR_STYLE = {
  borderRadius: DEFAULT_CAROUSEL_INDICATOR_SIZE / 2,
  height: DEFAULT_CAROUSEL_INDICATOR_SIZE,
  margin: DEFAULT_CAROUSEL_INDICATOR_SIZE / 3,
  width: DEFAULT_CAROUSEL_INDICATOR_SIZE,
};
export var DEFAULT_CAROUSEL_INDICATOR_ACTIVE_STYLE = __assign(
  __assign({}, DEFAULT_CAROUSEL_INDICATOR_STYLE),
  { backgroundColor: DEFAULT_CAROUSEL_COLOR_ACTIVE }
);
export var DEFAULT_CAROUSEL_INDICATOR_INACTIVE_STYLE = __assign(
  __assign({}, DEFAULT_CAROUSEL_INDICATOR_STYLE),
  { backgroundColor: DEFAULT_CAROUSEL_COLOR_INACTIVE }
);
export var VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 60 };
