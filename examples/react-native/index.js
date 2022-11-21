// These polyfills are required by Amplify JS,
// but are commonly found in most React Native apps
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { setupStorybook } from './storybook';

//TODO: replace with env var
const initStorybook = false;

const { StorybookRoot } = setupStorybook(initStorybook);

AppRegistry.registerComponent(appName, () =>
  initStorybook ? StorybookRoot : App
);
