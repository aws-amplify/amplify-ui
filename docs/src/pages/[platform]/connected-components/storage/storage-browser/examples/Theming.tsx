import * as React from 'react';
import { StorageBrowser } from './MockStorageBrowser'; // IGNORE
import {
  ThemeStyle,
  createTheme,
  defineComponentTheme,
} from '@aws-amplify/ui-react/server';
import { View } from '@aws-amplify/ui-react';

const storageBrowserTheme = defineComponentTheme({
  name: 'storage-browser',
  theme: (tokens) => {
    return {
      _element: {
        controls: {
          flexDirection: 'row-reverse',
          backgroundColor: tokens.colors.background.primary,
          padding: tokens.space.small,
          borderRadius: tokens.radii.small,
        },
        title: {
          fontWeight: tokens.fontWeights.thin,
        },
      },
    };
  },
});

const theme = createTheme({
  name: 'my-theme',
  components: [storageBrowserTheme],
});

export default function Example() {
  return (
    <View backgroundColor="background.tertiary" {...theme.containerProps()}>
      <StorageBrowser
        displayText={{
          LocationsView: {
            // Some display texts are a string
            title: 'Select a location',
            // Some are a function that return a string
            getPermissionName: (permissions) => permissions.join('/'),
          },
        }}
      />
      <ThemeStyle theme={theme} />
    </View>
  );
}
