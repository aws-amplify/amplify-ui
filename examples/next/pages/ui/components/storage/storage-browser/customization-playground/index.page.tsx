/* eslint-disable react/display-name */
import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  Button,
  Flex,
  IconsProvider,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import {
  ThemeStyle,
  createTheme,
  defineComponentTheme,
} from '@aws-amplify/ui-react/server';
// import { StorageBrowser } from '@aws-amplify/ui-react-storage';

import '@aws-amplify/ui-react-storage/styles.css';

import config from '../default-auth/aws-exports';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

Amplify.configure(config);

const MyCustomImage = ({ fileData, url }) => (
  <div style={{ border: '3px solid gray' }}>
    <div>this is my custom image renderer</div>
    <img src={url} />
  </div>
);

const storageBrowserTheme = defineComponentTheme({
  name: 'storage-browser',
  theme: (tokens) => {
    return {
      _element: {
        'file-preview': {
          backgroundColor: tokens.colors.blue[10],
          border: `2px solid ${tokens.colors.blue[60]}`,
          borderRadius: tokens.radii.large,
          padding: tokens.space.large,
        },
        'file-preview-title': {
          color: tokens.colors.blue[80],
          fontSize: tokens.fontSizes.large,
          fontWeight: tokens.fontWeights.bold,
        },
        'file-metadata': {
          backgroundColor: tokens.colors.blue[5],
          border: `1px solid ${tokens.colors.blue[20]}`,
          borderRadius: tokens.radii.medium,
          padding: tokens.space.medium,
        },
        'file-metadata-label': {
          color: tokens.colors.neutral[90],
          fontWeight: tokens.fontWeights.semibold,
        },
        'file-metadata-value': {
          color: tokens.colors.neutral[70],
          fontStyle: 'italic',
        },
        'text-preview': {
          backgroundColor: tokens.colors.neutral[5],
          border: `1px solid ${tokens.colors.neutral[20]}`,
          fontFamily: tokens.fonts.monospace,
          fontSize: tokens.fontSizes.small,
        },
        'preview-fallback': {
          backgroundColor: tokens.colors.red[5],
          border: `2px dashed ${tokens.colors.red[40]}`,
          borderRadius: tokens.radii.medium,
        },
      },
    };
  },
});

const theme = createTheme({
  name: 'storage-browser-preview-theme',
  primaryColor: 'blue',
  components: [storageBrowserTheme],
});

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
  filePreview: {
    fileTypeResolver: (properties) => {
      if (properties.contentType.endsWith('pdf')) return 'pdf';
      if (properties.key.endsWith('pdf')) return 'pdf';
      if (properties.key.endsWith('txt')) return 'text';
      if (properties.key.endsWith('mp4')) return 'video';
      if (properties.key.endsWith('jpg')) return 'image';
      return undefined;
    },
    maxFileSize: (fileType) => {
      if (fileType == 'pdf') return undefined;
    },
    urlOptions: (fileType) => {
      return undefined;
    },
    rendererResolver: (fileType) => {
      if (fileType == 'pdf')
        return ({ url }) => (
          <div>
            <div>This is the PDF resolver</div>
            <div>This is the URL {url}</div>
          </div>
        );

      // if (fileType == 'image') return MyCustomImage;

      return undefined;
    },
  },
});

const IndeterminateIcon = () => (
  <View as="span" className="amplify-icon" width="1em" height="1em">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      viewBox="0 0 24 24"
    >
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  </View>
);

function Example() {
  return (
    <View backgroundColor="background.tertiary" {...theme.containerProps()}>
      <Flex
        direction="column"
        width="100vw"
        height="100vh"
        overflow="hidden"
        padding="xl"
      >
        <Button
          marginBlockEnd="xl"
          alignSelf="flex-start"
          size="small"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
        <View flex="1" overflow="hidden">
          <IconsProvider
            icons={{
              storageBrowser: { 'sort-indeterminate': <IndeterminateIcon /> },
            }}
          >
            <StorageBrowser
              displayText={{ LocationsView: { title: 'Home - Amplify Auth' } }}
            />
          </IconsProvider>
        </View>
      </Flex>
      <ThemeStyle theme={theme} />
    </View>
  );
}

export default withAuthenticator(Example);
