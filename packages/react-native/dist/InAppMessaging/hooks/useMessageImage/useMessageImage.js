var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { ImagePrefetchStatus } from './types';
import { getLayoutImageDimensions, prefetchNetworkImage } from './utils';
var logger = new Logger('Notifications.InAppMessaging');
/**
 * Handles prefetching and dimension setting for message images
 *
 * @param {InAppMessageImage} image - contains image source
 * @param {InAppMessageLayout} layout - message layout
 * @returns {UseMessageImage} message image dimensions and rendering related booleans
 */
export default function useMessageImage(image, layout) {
    var src = (image !== null && image !== void 0 ? image : {}).src;
    var shouldPrefetch = !!src;
    // set initial status to fetching if prefetch is required
    var _a = __read(useState(shouldPrefetch ? ImagePrefetchStatus.FETCHING : null), 2), prefetchStatus = _a[0], setPrefetchStatus = _a[1];
    var imageDimensions = useRef({
        height: null,
        width: null,
    }).current;
    var isImageFetching = prefetchStatus === ImagePrefetchStatus.FETCHING;
    var hasRenderableImage = prefetchStatus === ImagePrefetchStatus.SUCCESS;
    useEffect(function () {
        if (!shouldPrefetch) {
            return;
        }
        prefetchNetworkImage(src).then(function (prefetchResult) {
            if (prefetchResult === 'loaded') {
                // get image size once loaded
                Image.getSize(src, function (imageWidth, imageHeight) {
                    var _a = getLayoutImageDimensions(imageHeight, imageWidth, layout), height = _a.height, width = _a.width;
                    imageDimensions.height = height;
                    imageDimensions.width = width;
                    setPrefetchStatus(ImagePrefetchStatus.SUCCESS);
                }, function (error) {
                    // handle size retrieval error
                    logger.error("Unable to retrieve size for image: ".concat(error));
                    setPrefetchStatus(ImagePrefetchStatus.FAILURE);
                });
            }
            else {
                // handle prefetch failure
                setPrefetchStatus(ImagePrefetchStatus.FAILURE);
            }
        });
    }, [imageDimensions, layout, shouldPrefetch, src]);
    return { hasRenderableImage: hasRenderableImage, imageDimensions: imageDimensions, isImageFetching: isImageFetching };
}
