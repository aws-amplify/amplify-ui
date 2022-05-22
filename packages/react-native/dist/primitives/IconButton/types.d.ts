import { ColorValue, ImageSourcePropType, ImageStyle, PressableProps } from 'react-native';
export interface IconButtonStyles {
    icon: ImageStyle;
}
export interface IconButtonProps extends PressableProps {
    /**
     * color to be applied to the icon
     */
    color?: ColorValue;
    /**
     * icon source, only supports images at this time
     */
    source: ImageSourcePropType;
    /**
     * icon size
     */
    size?: number;
}
