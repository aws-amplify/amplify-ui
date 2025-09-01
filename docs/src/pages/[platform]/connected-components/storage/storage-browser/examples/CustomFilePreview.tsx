import React from 'react';
import Image from 'next/image';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig'; // IGNORE
import { defaultActions } from './defaultActions'; // IGNORE

const CustomImageRenderer = ({ fileData, url }: any) => (
  <div style={{ border: '3px solid gray' }}>
    <div>this is my custom image renderer</div>
    <Image src={url} alt={fileData?.key} width={500} height={300} />
  </div>
);

const CustomAudioRenderer = ({ fileData, url }: any) => (
  <div
    style={{
      border: '3px solid #6f42c1',
      padding: '15px',
      borderRadius: '8px',
    }}
  >
    <h3>🎵 Audio Player</h3>
    <p>
      <strong>File:</strong> {fileData?.key}
    </p>
    <audio controls style={{ width: '100%' }}>
      <source src={url} />
      Your browser does not support the audio element.
    </audio>
  </div>
);

const { StorageBrowser } = createStorageBrowser({
  config: mockConfig, // IGNORE
  actions: { default: defaultActions }, // IGNORE
  filePreview: {
    fileTypeResolver: (properties) => {
      if (properties.key.endsWith('txt')) return 'text';
      if (properties.key.endsWith('mp4')) return 'video';
      if (properties.key.endsWith('jpg')) return 'image';

      // Audio files
      if (properties?.contentType?.startsWith('audio/')) return 'audio';

      return undefined;
    },
    maxFileSize: (fileType) => {
      // 1GB preview limit for videos
      if (fileType == 'video') return 1000 * 1024 * 1024;
    },
    urlOptions: (fileType) => {
      // 3 hours expiration for the pre-signed url for videos
      if (fileType == 'video')
        return { expiresIn: 1000 * 60 * 60 * 3, validateObjectExistence: true };
    },
    rendererResolver: (fileType) => {
      // Add a new renderer for certain files types
      if (fileType === 'audio') return CustomAudioRenderer;

      if (fileType == 'image') {
        // Override the default image renderer
        return CustomImageRenderer;
      }
    },
  },
});

export default function Example() {
  return <StorageBrowser />;
}
