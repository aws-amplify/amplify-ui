import React from 'react';
import Image from 'next/image';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  Button,
  Flex,
  IconsProvider,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';

import config from '../default-auth/aws-exports';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

Amplify.configure(config);

const MyCustomImage = ({ fileData, url }) => (
  <div style={{ border: '3px solid gray' }}>
    <div>this is my custom image renderer</div>
    <Image src={url} alt={fileData.key} width={500} height={300} />
  </div>
);

const PdfRenderer = ({ url }) => (
  <div>
    <div>This is the PDF resolver</div>
    <div>This is the URL {url}</div>
  </div>
);

const ImageRenderer = ({ fileData, url }) => (
  <MyCustomImage fileData={fileData} url={url} />
);
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
      if (fileType == 'pdf') return { expiresIn: 100000 };
      return undefined;
    },
    rendererResolver: (fileType) => {
      if (fileType == 'pdf') return PdfRenderer;
      if (fileType === 'image') return ImageRenderer;
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
  );
}

export default withAuthenticator(Example);
