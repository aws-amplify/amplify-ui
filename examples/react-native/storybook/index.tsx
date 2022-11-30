import React from 'react';
import { LogBox, Platform } from 'react-native';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import noop from 'lodash/noop';

import { Screen } from './Screen';
import { loadStories } from './storyLoader';

const STORYBOOK_REQUIRE_CYCLE_PREFIX =
  'Require cycle: node_modules/core-js/internals/microtask.js';

// only initialize storybook resources when initStorybook is true
export function setupStorybook(initStorybook: boolean) {
  if (initStorybook) {
    // Turn off the require cycle LogBox warning storybook triggers from within getStorybookUI
    // This should be removed once Storybook is upgraded to v6: https://github.com/storybookjs/react-native/issues/240
    LogBox.ignoreLogs([STORYBOOK_REQUIRE_CYCLE_PREFIX]);
    configure(() => {
      loadStories();
    }, module);

    // add decorators
    addDecorator(withKnobs);
    addDecorator((Story: any) => (
      <Screen>
        <Story />
      </Screen>
    ));
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
