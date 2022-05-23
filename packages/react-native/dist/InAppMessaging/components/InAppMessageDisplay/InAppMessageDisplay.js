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
import React from 'react';
import isNil from 'lodash/isNil';
import { handleMessageAction, useMessage } from '@aws-amplify/ui-react-core';
// import BannerMessage from '../BannerMessage';
import FullScreenMessage from '../FullScreenMessage';
// import CarouselMessage from '../CarouselMessage';
// import ModalMessage from '../ModalMessage';
import handleMessageLinkAction from './handleMessageLinkAction';
// const platformComponents = { BannerMessage, CarouselMessage, FullScreenMessage, ModalMessage };
function BannerMessage(_) {
  return null;
}
function CarouselMessage(_) {
  return null;
}
function ModalMessage(_) {
  return null;
}
var platformComponents = {
  BannerMessage: BannerMessage,
  CarouselMessage: CarouselMessage,
  FullScreenMessage: FullScreenMessage,
  ModalMessage: ModalMessage,
};
// const handleMessageAction = (_: any) => null;
// type OnMessageAction = ({ action: any, url: string }) => void;
// const useMessage = (_: any) => ({ Component: ModalMessage, props: null });
var onMessageAction = function (_a) {
  var action = _a.action,
    url = _a.url;
  handleMessageAction({
    action: action,
    url: url,
    handleMessageLinkAction: handleMessageLinkAction,
  });
};
function InAppMessageDisplay(_a) {
  var overrideComponents = _a.components,
    styles = _a.styles;
  var components = React.useMemo(
    function () {
      return __assign(__assign({}, platformComponents), overrideComponents);
    },
    [overrideComponents]
  );
  var _b = useMessage({
      components: components,
      onMessageAction: onMessageAction,
      styles: styles,
    }),
    Component = _b.Component,
    props = _b.props;
  return !isNil(Component) ? <Component {...props} /> : null;
}
export default InAppMessageDisplay;
