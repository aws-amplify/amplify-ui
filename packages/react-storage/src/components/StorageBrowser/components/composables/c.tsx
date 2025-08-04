import * as React from 'react';
import { StorageBrowser } from './StorageBrowser';
import { FileData } from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser/actions/handlers/types';

const BUILT_IN_FILE_TYPES = ['text', 'video', 'image', 'unknown'] as const;
type BuiltInFileType = (typeof BUILT_IN_FILE_TYPES)[number];

type FileType = BuiltInFileType | string | undefined;
type FileTypeSizeKey = BuiltInFileType | string;

interface PreviewConfig {
  getFileType?: (fileData: FileData, contentType: string) => FileType;
  customRenderers?: Record<string, React.ComponentType<{ fileData: FileData }>>;
  options?: GetUrlOptions;
  sizeLimit?: Record<FileTypeSizeKey, string>;
}

export default function Example() {
  return (
    <StorageBrowser
      previewConfig={{
        getFileType: (fileData: FileData, contentType: string): FileType => {
          const { key } = fileData;
          const extension = key.split('.').pop()?.toLowerCase();

          if (extension === 'myext') return 'text';

          if (contentType === 'application/custom') return 'video';

          return undefined; //Will fallback to the built-in file type resolution
        },
      }}
    />
  );
}
