import { AppRegistry, Platform } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import App from './App';
import { name as appName } from './app.json';
import { loadStories } from './storybook/storyLoader';

//TODO: replace with env var
const isStorybook = false;

if (isStorybook) {
  configure(() => {
    loadStories();
  }, module);
}

const Root = isStorybook
  ? getStorybookUI({
      asyncStorage: require('@react-native-async-storage/async-storage')
        .default,
      /*
       * Get React Native server IP if hostname is `localhost`
       * On Android emulator, the IP of host is `10.0.2.2`
       */
      host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0',
    })
  : App;

AppRegistry.registerComponent(appName, () => Root);
