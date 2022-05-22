var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { useDeviceOrientation } from '../../../hooks';
import { useMessageProps } from '../../hooks';
import { MessageLayout } from '../MessageLayout';
import { MessageWrapper } from '../MessageWrapper';
import { getLandscapeStyles, getPortraitStyles } from './styles';
export default function FullScreenMessage(props) {
    var _a = useDeviceOrientation(), deviceOrientation = _a.deviceOrientation, isPortraitMode = _a.isPortraitMode;
    var messageProps = useMessageProps(props, isPortraitMode ? getPortraitStyles : getLandscapeStyles, deviceOrientation);
    var shouldRenderMessage = messageProps.shouldRenderMessage, styles = messageProps.styles;
    if (!shouldRenderMessage) {
        return null;
    }
    var _b = styles, wrapper = _b.wrapper, messageStyles = __rest(_b, ["wrapper"]);
    return (<MessageWrapper style={wrapper}>
      <MessageLayout {...props} {...messageProps} orientation={deviceOrientation} styles={messageStyles}/>
    </MessageWrapper>);
}
