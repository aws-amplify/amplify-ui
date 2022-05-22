var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Image } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { BANNER_IMAGE_SCREEN_SIZE, CAROUSEL_IMAGE_SCREEN_SIZE, FULL_SCREEN_IMAGE_SCREEN_SIZE, MODAL_IMAGE_SCREEN_SIZE, } from './constants';
var logger = new Logger('Notifications.InAppMessaging');
var inAppMessageImageSizes = {
    BOTTOM_BANNER: BANNER_IMAGE_SCREEN_SIZE,
    MIDDLE_BANNER: BANNER_IMAGE_SCREEN_SIZE,
    TOP_BANNER: BANNER_IMAGE_SCREEN_SIZE,
    CAROUSEL: CAROUSEL_IMAGE_SCREEN_SIZE,
    FULL_SCREEN: FULL_SCREEN_IMAGE_SCREEN_SIZE,
    MODAL: MODAL_IMAGE_SCREEN_SIZE,
};
export var prefetchNetworkImage = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var loaded, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Image.prefetch(url)];
            case 1:
                loaded = _a.sent();
                if (loaded) {
                    return [2 /*return*/, 'loaded'];
                }
                logger.error("Image failed to load: ".concat(url));
                return [2 /*return*/, 'failed'];
            case 2:
                e_1 = _a.sent();
                logger.error("Image.prefetch failed: ".concat(e_1));
                return [2 /*return*/, 'failed'];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getLayoutImageDimensions = function (imageHeight, imageWidth, layout) {
    // determine aspect ratio for scaling rendered image
    var aspectRatio = imageWidth / imageHeight;
    var isSquare = aspectRatio === 1;
    var isPortrait = imageHeight > imageWidth;
    var isLandscape = imageWidth > imageHeight;
    // an image that has smaller dimensions than the max image dimension (e.g. 10px x 10px)
    // will be scaled up in size to match the size the message component expects.
    // While this could lead to pixelated images, it was ultimately a product decision,
    // ideally the message creator would follow the image guidelines in the pinpoint console
    var maxImageDimension = inAppMessageImageSizes[layout];
    var height = null;
    var width = null;
    // set square image dimensions
    if (isSquare) {
        height = maxImageDimension;
        width = maxImageDimension;
    }
    // set portrait image dimensions
    if (isPortrait) {
        height = maxImageDimension;
        width = maxImageDimension * aspectRatio;
    }
    // set landscape image dimensions
    if (isLandscape) {
        height = maxImageDimension / aspectRatio;
        width = maxImageDimension;
    }
    return { height: height, width: width };
};
