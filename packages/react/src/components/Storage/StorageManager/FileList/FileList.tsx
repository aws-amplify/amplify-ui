import React from 'react';

import {
  Alert,
  Button,
  ComponentClassNames,
  Loader,
  Text,
  View,
} from '../../../../primitives';
import { StorageManagerDisplayText } from '../displayText';
import { FileState } from '../types';
import { FileControl } from './FileControl';
import { FileListProps } from './types';

export function FileList({
  displayText,
  files,
  hasMaxFilesError,
  isResumable,
  onRemoveUpload,
  showThumbnails,
  maxFileCount,
}: FileListProps): JSX.Element | null {
  if (files.length < 1) {
    return null;
  }

  const { getMaxFilesErrorText } = displayText;
  const headingMaxFiles = getMaxFilesErrorText(maxFileCount);

  return (
    <View className={'amplify-filemanager--filelist'}>
      {files.map((storageFile) => {
        const { file, status, progress, error, name, isImage, id } =
          storageFile;

        const thumbnailUrl = file && isImage ? URL.createObjectURL(file) : '';

        // @TODO: Add back when adding editing functionality

        // // Focus the input after pressing the edit button
        // const inputRef = React.useRef<HTMLInputElement>(null);
        // useEffect(() => {
        //   if (fileState === FileState.EDITING && inputRef.current) {
        //     inputRef.current.focus();
        //   }
        // }, [fileState]);

        const loaderIsDeterminate = isResumable ? progress > 0 : true;
        // const showEditButton =
        //   status === FileState.INIT ||
        //   (status === FileState.ERROR && error === extensionNotAllowedText);
        // const onStartEdit = () => console.log('edit me');
        // const onCancel = () => console.log('cancel');

        const onRemove = () => {
          if (status === FileState.READY) {
            onRemoveUpload(id);
          }
          if (status === FileState.UPLOADED) {
            // handle DELETE existing file here
          }
        };

        return (
          <FileControl
            displayName={name}
            errorMessage={error}
            displayText={displayText}
            isImage={isImage}
            key={id}
            loaderIsDeterminate={loaderIsDeterminate}
            onRemove={onRemove}
            onStartEdit={() => console.log(`onStartEdit ${name}`)}
            progress={progress}
            showThumbnails={showThumbnails}
            size={file.size}
            status={status}
            thumbnailUrl={thumbnailUrl}
          />
        );
      })}
      {hasMaxFilesError && (
        <Alert variation="error" heading={headingMaxFiles} />
      )}
    </View>
  );
}
