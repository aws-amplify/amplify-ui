import * as React from 'react';
import { StorageBrowser } from './StorageBrowser'; // IGNORE
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
  primaryColor: 'green',
  components: [storageBrowserTheme],
});

export default function Example() {
  return (
    <View backgroundColor="background.tertiary" {...theme.containerProps()}>
      <StorageBrowser />
      <ThemeStyle theme={theme} />
    </View>
  );
}
