import { getStorybookUI, configure } from '@storybook/react-native';
import { Platform } from 'react-native';

import { loadStories } from './storyLoader';

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  /*
   * Get React Native server IP if hostname is `localhost`
   * On Android emulator, the IP of host is `10.0.2.2`
   */
  host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0',
});

export default StorybookUIRoot;
