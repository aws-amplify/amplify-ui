var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { BORDER_RADIUS_BASE, COLOR_LIGHT_GREY, COLOR_WHITE, FONT_SIZE_BASE, FONT_SIZE_LARGE, FONT_WEIGHT_BASE, LINE_HEIGHT_BASE, LINE_HEIGHT_LARGE, SPACING_EXTRA_LARGE, SPACING_LARGE, SPACING_MEDIUM, } from '../constants';
var commonStyles = {
    body: {
        fontSize: FONT_SIZE_BASE,
        fontWeight: FONT_WEIGHT_BASE,
        lineHeight: LINE_HEIGHT_BASE,
    },
    buttonContainer: {
        backgroundColor: COLOR_LIGHT_GREY,
        borderRadius: BORDER_RADIUS_BASE,
        flex: 1,
        margin: SPACING_MEDIUM,
        padding: SPACING_LARGE,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: FONT_SIZE_BASE,
        fontWeight: FONT_WEIGHT_BASE,
        lineHeight: LINE_HEIGHT_BASE,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: SPACING_EXTRA_LARGE,
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        fontSize: FONT_SIZE_LARGE,
        fontWeight: FONT_WEIGHT_BASE,
        lineHeight: LINE_HEIGHT_LARGE,
    },
    iconButton: {
        alignSelf: 'flex-start',
        marginBottom: SPACING_MEDIUM,
        marginLeft: 'auto',
        marginRight: SPACING_MEDIUM,
    },
    imageContainer: {
        alignItems: 'center',
        margin: SPACING_LARGE,
    },
    textContainer: {
        paddingHorizontal: SPACING_MEDIUM,
    },
    wrapper: {
        backgroundColor: COLOR_WHITE,
    },
};
export var getPortraitStyles = function (imageDimensions) { return (__assign(__assign({}, commonStyles), { buttonsContainer: __assign(__assign({}, commonStyles.buttonsContainer), { marginTop: 'auto' }), image: __assign({}, imageDimensions), textContainer: __assign(__assign({}, commonStyles.textContainer), { marginVertical: SPACING_LARGE }) })); };
export var getLandscapeStyles = function (imageDimensions) { return (__assign(__assign({}, commonStyles), { contentContainer: __assign(__assign({}, commonStyles.contentContainer), { flexDirection: 'row' }), image: __assign({}, imageDimensions), imageContainer: __assign(__assign({}, commonStyles.imageContainer), { justifyContent: 'center' }), textContainer: __assign(__assign({}, commonStyles.textContainer), { flex: 1, justifyContent: 'center' }), wrapper: __assign(__assign({}, commonStyles.wrapper), { flex: 1 }) })); };
