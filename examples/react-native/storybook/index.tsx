import { Platform } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import noop from 'lodash/noop';
import { loadStories } from './storyLoader';

// only initialize storybook resources when initStorybook is true
export function setupStorybook(initStorybook: boolean) {
  if (initStorybook) {
    configure(() => {
      loadStories();
    }, module);
  }

  // Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
  // To find allowed options for getStorybookUI
  const StorybookRoot = initStorybook
    ? getStorybookUI({
        asyncStorage: require('@react-native-async-storage/async-storage')
          .default,
        /*
         * Get React Native server IP if hostname is `localhost`
         * On Android emulator, the IP of host is `10.0.2.2`
         */
        host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0',
      })
    : noop;

  return { StorybookRoot };
}
