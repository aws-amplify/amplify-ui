import React from 'react';

import { ComponentClassNames, Text, View } from '../../../../primitives';
import { FileControl } from './FileControl';
import { FileListProps } from './types';

export function FileList({
  extensionNotAllowedText,
  files,
  getPausedText,
  getUploadingText,
  isResumable,
  pauseText,
  resumeText,
  showThumbnails,
  uploadSuccessfulText,
}: FileListProps): JSX.Element | null {
  if (files.length < 1) {
    return null;
  }

  return (
    <View className={ComponentClassNames.StorageManagerPreviewer}>
      <View className={ComponentClassNames.StorageManagerPreviewerBody}>
        <Text className={ComponentClassNames.StorageManagerPreviewerText}>
          {/* {isSuccessful
          ? getFilesUploadedText(getUploadedFilesLength())
          : getRemainingFilesText(remainingFilesLength)} */}
        </Text>
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

          return (
            <FileControl
              displayName={name}
              errorMessage={error}
              extensionNotAllowedText={extensionNotAllowedText}
              getPausedText={getPausedText}
              getUploadingText={getUploadingText}
              isImage={isImage}
              key={id}
              loaderIsDeterminate={loaderIsDeterminate}
              onRemove={() => console.log(`onRemove ${name}`)}
              onStartEdit={() => console.log(`onStartEdit ${name}`)}
              pauseText={pauseText}
              progress={progress}
              resumeText={resumeText}
              showThumbnails={showThumbnails}
              size={file.size}
              status={status}
              uploadSuccessfulText={uploadSuccessfulText}
              thumbnailUrl={thumbnailUrl}
            />
          );
        })}
      </View>
    </View>
  );
}

{
  /* <View className={ComponentClassNames.StorageManagerPreviewerFooter}>
<View>
  {isLoading && (
    <>
      <Text>{getUploadingText(aggregatePercentage)}</Text>
      <Loader
        className={ComponentClassNames.StorageManagerLoader}
        variation="linear"
        percentage={aggregatePercentage}
        isPercentageTextHidden
        isDeterminate
      />
    </>
  )}
</View>

<View className={ComponentClassName.StorageManagerPreviewerFooterActions}>
  {!isLoading && !isSuccessful && (
    <>
      <Button size="small" variation="link" onClick={onClear}>
        {clearButtonText}
      </Button>
      <Button
        disabled={isDisabled}
        size="small"
        variation="primary"
        onClick={onFileClick}
      >
        {getUploadButtonText(remainingFilesLength)}
      </Button>
    </>
  )}
  {isSuccessful && (
    <Button size="small" onClick={onClear}>
      {doneButtonText}
    </Button>
  )}
</View>
{hasMaxFilesError && (
  <Alert variation="error" heading={headingMaxFiles} />
)}
</View> */
}
