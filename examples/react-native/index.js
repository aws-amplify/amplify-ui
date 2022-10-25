import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { setupStorybook } from './storybook';

//TODO: replace with env var
const initStorybook = true;

const { StorybookRoot } = setupStorybook(initStorybook);

AppRegistry.registerComponent(appName, () =>
  initStorybook ? StorybookRoot : App
);
