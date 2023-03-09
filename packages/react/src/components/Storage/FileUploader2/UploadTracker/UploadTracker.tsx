import React, { useEffect } from 'react';

import { View, Loader, ComponentClassNames } from '../../../../primitives';

import { FileState } from '../types';
import { UploadMessage } from '../UploadMessage';
import { UploadTrackerProps } from './types';
import { FileActions } from './FileActions';
import { FileDetails } from './FileDetails';
import { FileThumbnail } from './FileThumbnail';

export function UploadTracker({
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
}: UploadTrackerProps): JSX.Element {
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
      <UploadMessage
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
