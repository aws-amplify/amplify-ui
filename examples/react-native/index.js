import { AppRegistry } from 'react-native';
import App from './App';
import StorybookUIRoot from './storybook';
import { name as appName } from './app.json';

//TODO: replace with env var
const isStorybook = false;

AppRegistry.registerComponent(appName, () =>
  isStorybook ? StorybookUIRoot : App
);
