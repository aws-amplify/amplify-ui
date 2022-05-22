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
import { Image, Text, View } from 'react-native';
import icons from '../../../assets';
import { Button, IconButton } from '../../../primitives';
import { ICON_BUTTON_HIT_SLOP, ICON_BUTTON_SIZE } from '../constants';
var IN_APP_MESSAGING = {
    BODY: 'aws-amplify__in-app-messaging--body',
    CLOSE_BUTTON: 'aws-amplify__in-app-messaging--close-button',
    HEADER: 'aws-amplify__in-app-messaging--header',
    IMAGE: 'aws-amplify__in-app-messaging--image',
    PRIMARY_BUTTON: 'aws-amplify__in-app-messaging--primary-button',
    SECONDARY_BUTTON: 'aws-amplify__in-app-messaging--secondary-button',
};
export default function MessageLayout(_a) {
    var orientation = _a.orientation, props = __rest(_a, ["orientation"]);
    var body = props.body, hasButtons = props.hasButtons, hasPrimaryButton = props.hasPrimaryButton, hasRenderableImage = props.hasRenderableImage, hasSecondaryButton = props.hasSecondaryButton, header = props.header, image = props.image, onClose = props.onClose, primaryButton = props.primaryButton, secondaryButton = props.secondaryButton, styles = props.styles;
    var iconButton = (<IconButton color={styles.iconButton.iconColor} hitSlop={ICON_BUTTON_HIT_SLOP} onPress={onClose} size={ICON_BUTTON_SIZE} source={icons.close} style={styles.iconButton.container} testID={IN_APP_MESSAGING.CLOSE_BUTTON}/>);
    return (<View style={styles.container}>
      <View style={styles.contentContainer}>
        {orientation === 'portrait' && iconButton}
        {hasRenderableImage && (<View style={styles.imageContainer}>
            <Image source={{ uri: image === null || image === void 0 ? void 0 : image.src }} style={styles.image} testID={IN_APP_MESSAGING.IMAGE}/>
          </View>)}
        <View style={styles.textContainer}>
          {(header === null || header === void 0 ? void 0 : header.content) && (<Text style={styles.header} testID={IN_APP_MESSAGING.HEADER}>
              {header.content}
            </Text>)}
          {(body === null || body === void 0 ? void 0 : body.content) && (<Text style={styles.body} testID={IN_APP_MESSAGING.BODY}>
              {body.content}
            </Text>)}
        </View>
        {orientation === 'landscape' && iconButton}
      </View>
      {hasButtons && (<View style={styles.buttonsContainer}>
          {hasSecondaryButton && (<Button onPress={secondaryButton === null || secondaryButton === void 0 ? void 0 : secondaryButton.onAction} style={styles.secondaryButton.container} testID={IN_APP_MESSAGING.SECONDARY_BUTTON} textStyle={styles.secondaryButton.text}>
              {secondaryButton === null || secondaryButton === void 0 ? void 0 : secondaryButton.title}
            </Button>)}
          {hasPrimaryButton && (<Button onPress={primaryButton === null || primaryButton === void 0 ? void 0 : primaryButton.onAction} style={styles.primaryButton.container} testID={IN_APP_MESSAGING.PRIMARY_BUTTON} textStyle={styles.primaryButton.text}>
              {primaryButton === null || primaryButton === void 0 ? void 0 : primaryButton.title}
            </Button>)}
        </View>)}
    </View>);
}
