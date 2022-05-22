import { StyleSheet } from 'react-native';
export var getStyles = function (color, size) {
    return StyleSheet.create({
        icon: {
            height: size,
            resizeMode: 'contain',
            tintColor: color,
            width: size,
        },
    });
};
