// disable `@typescript-eslint/no-var-requires` for this file
// .png icons will be removed in favor of .svg icons
/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageSourcePropType } from 'react-native';

const icons = {
  amazonLogo: require('./amazonLogo.png') as ImageSourcePropType,
  appleLogo: require('./appleLogo.png') as ImageSourcePropType,
  checkboxFilled: require('./checkboxFilled.png') as ImageSourcePropType,
  checkboxOutline: require('./checkboxOutline.png') as ImageSourcePropType,
  close: require('./close.png') as ImageSourcePropType,
  copy: require('./copy.png') as ImageSourcePropType,
  error: require('./error.png') as ImageSourcePropType,
  facebookLogo: require('./facebookLogo.png') as ImageSourcePropType,
  googleLogo: require('./googleLogo.png') as ImageSourcePropType,
  visibilityOn: require('./visibilityOn.png') as ImageSourcePropType,
  visibilityOff: require('./visibilityOff.png') as ImageSourcePropType,
};

export default icons;
