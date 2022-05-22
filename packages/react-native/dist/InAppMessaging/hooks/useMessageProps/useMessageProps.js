import { useEffect, useMemo, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useMessageImage } from '../useMessageImage';
import { getPayloadStyle, getMessageStyles } from './utils';
/**
 * Handle common message UI component prop logic including setting of image dimensions,
 * render booleans, and style resolving
 *
 * @param {MessageComponentBaseProps} props - message UI component props
 * @param {GetDefaultStyle} getDefaultStyle - returns default UI component style
 * @param {DeviceOrientation} orientation - device orientation, defaults to `portrait`
 
 * @returns {UseMessageProps} message UI component render related booleans and styles
 */
export default function useMessageProps(props, getDefaultStyle, orientation) {
    if (orientation === void 0) { orientation = 'portrait'; }
    var image = props.image, layout = props.layout, onDisplay = props.onDisplay, primaryButton = props.primaryButton, secondaryButton = props.secondaryButton;
    var hasDisplayed = useRef(false);
    var _a = useMessageImage(image, layout), hasRenderableImage = _a.hasRenderableImage, imageDimensions = _a.imageDimensions, isImageFetching = _a.isImageFetching;
    var shouldRenderMessage = !isImageFetching;
    useEffect(function () {
        if (!hasDisplayed.current && shouldRenderMessage) {
            onDisplay === null || onDisplay === void 0 ? void 0 : onDisplay();
            hasDisplayed.current = true;
        }
    }, [onDisplay, shouldRenderMessage]);
    var hasPrimaryButton = !isEmpty(primaryButton);
    var hasSecondaryButton = !isEmpty(secondaryButton);
    var hasButtons = hasPrimaryButton || hasSecondaryButton;
    var styles = useMemo(function () {
        // prevent generating style if message rendering is delayed
        if (!shouldRenderMessage) {
            return null;
        }
        var defaultStyle = getDefaultStyle(imageDimensions);
        var payloadStyle = getPayloadStyle(props);
        var overrideStyle = props.style;
        return getMessageStyles({
            styleParams: { defaultStyle: defaultStyle, payloadStyle: payloadStyle, overrideStyle: overrideStyle },
            layout: layout,
            orientation: orientation,
        });
    }, [
        getDefaultStyle,
        layout,
        imageDimensions,
        orientation,
        props,
        shouldRenderMessage,
    ]);
    return {
        hasButtons: hasButtons,
        hasPrimaryButton: hasPrimaryButton,
        hasRenderableImage: hasRenderableImage,
        hasSecondaryButton: hasSecondaryButton,
        shouldRenderMessage: shouldRenderMessage,
        styles: styles,
    };
}
