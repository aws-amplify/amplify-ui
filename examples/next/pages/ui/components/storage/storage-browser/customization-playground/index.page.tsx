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

import '@aws-amplify/ui-react-storage/styles.css';

import config from '../default-auth/aws-exports';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

Amplify.configure(config);

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
        'file-metadata-label': {
          color: tokens.colors.neutral[90],
          fontWeight: tokens.fontWeights.semibold,
        },
        'text-preview': {
          border: `1px solid ${tokens.colors.neutral[20]}`,
          fontSize: tokens.fontSizes.small,
        },
        'file-metadata': {
          borderRadius: tokens.radii.medium,
          padding: tokens.space.medium,
        },
        'file-metadata-value': {},
        'preview-fallback': {},
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
              storageBrowser: {
                'sort-indeterminate': <IndeterminateIcon />,
                'file-image': <div style={{ paddingRight: '5px' }}>🖼️</div>,
                'file-video': <div style={{ paddingRight: '5px' }}>🎥</div>,
                'file-audio': <div style={{ paddingRight: '5px' }}>🎵</div>,
                'file-text': <div style={{ paddingRight: '5px' }}>📄</div>,
                'file-pdf': <div style={{ paddingRight: '5px' }}>📕</div>,
                'file-excel': <div style={{ paddingRight: '5px' }}>📊</div>,
                'file-word': <div style={{ paddingRight: '5px' }}>📝</div>,
                'file-powerpoint': (
                  <div style={{ paddingRight: '5px' }}>📊</div>
                ),
                'file-archive': <div style={{ paddingRight: '5px' }}>🗜️</div>,
              },
            }}
          >
            <StorageBrowser
              displayText={{
                LocationsView: { title: 'My Custom Storage' },
                LocationDetailView: {
                  filePreview: {
                    closeButtonLabel: 'Close Preview',
                    filePreviewTitle: '📄 File Preview Panel',
                    fileInformationTitle: 'ℹ️ File Details',
                    errorMessage: '❌ Preview failed to load',
                    sizeLimitMessage: '📏 File too large for preview',
                    keyLabel: '🔑 File Path',
                    sizeLabel: '📊 File Size',
                    versionIdLabel: '🏷️ Version',
                    lastModifiedLabel: '📅 Last Updated',
                    entityTagLabel: '🏷️ ETag',
                    typeLabel: '📁 File Type',
                    unknownValue: 'N/A',
                    errorDescription:
                      '⚠️ Something went wrong while loading the preview.',
                    unsupportedFileDescription:
                      '🚫 This file format is not supported for preview.',
                    filePrefix: '📄 File: ',
                    retryButtonLabel: '🔄 Try Again',
                    downloadButtonLabel: '⬇️ Download File',
                    getTextErrorMessage: (error) =>
                      `💥 Failed to load text: ${error}`,
                    emptyFileMessage: '📄 This file appears to be empty',
                  },
                },
              }}
            />
          </IconsProvider>
        </View>
      </Flex>
      <ThemeStyle theme={theme} />
    </View>
  );
}

export default withAuthenticator(Example);
