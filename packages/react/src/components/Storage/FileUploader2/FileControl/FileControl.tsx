import React, { useEffect } from 'react';

import { View, Loader, ComponentClassNames } from '../../../../primitives';

import { FileState } from '../types';
import { FileStatusMessage } from './FileStatusMessage';
import { FileActions } from './FileActions';
import { FileDetails } from './FileDetails';
import { FileThumbnail } from './FileThumbnail';
import { FileControlProps } from './types';

export function FileControl({
  errorMessage,
  file,
  fileState,
  hasImage,
  displayName,
  onCancel,
  // onCancelEdit,
  // onPause,
  // onResume,
  // onSaveEdit,
  onStartEdit,
  percentage,
  isResumable,
  showImage,
  extensionNotAllowedText,
  // pauseText,
  // resumeText,
  getPausedText,
  uploadSuccessfulText,
  getUploadingText,
  handleUploadFile,
  shouldAutoLoad,
}: FileControlProps): JSX.Element {
  // const inputRef = React.useRef<HTMLInputElement>(null);
  const url = URL.createObjectURL(file);

  // @TODO: Add back when adding editing functionality
  // // Focus the input after pressing the edit button
  // useEffect(() => {
  //   if (fileState === FileState.EDITING && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [fileState]);

  useEffect(() => {
    if (shouldAutoLoad && fileState === FileState.INIT) {
      handleUploadFile();
    }
  }, [shouldAutoLoad, fileState, handleUploadFile]);

  if (!file) return null;

  const isDeterminate = isResumable ? percentage > 0 : true;

  return (
    <View className={ComponentClassNames.FileUploaderFile}>
      <View className={ComponentClassNames.FileUploaderFileWrapper}>
        <FileThumbnail
          hasImage={hasImage}
          file={file}
          showImage={showImage}
          url={url}
        />
        <FileDetails
          displayName={displayName}
          onStartEdit={onStartEdit}
          extensionNotAllowedText={extensionNotAllowedText}
          fileState={fileState}
          file={file}
          errorMessage={errorMessage}
        />
        <FileActions file={file} fileState={fileState} onCancel={onCancel} />

        {fileState === FileState.LOADING ? (
          <Loader
            className={ComponentClassNames.FileUploaderLoader}
            variation="linear"
            percentage={percentage}
            isDeterminate={isDeterminate}
            isPercentageTextHidden
          />
        ) : null}
      </View>
      <FileStatusMessage
        uploadSuccessfulText={uploadSuccessfulText}
        getUploadingText={getUploadingText}
        getPausedText={getPausedText}
        fileState={fileState}
        errorMessage={errorMessage}
        percentage={percentage}
      />
    </View>
  );
}
