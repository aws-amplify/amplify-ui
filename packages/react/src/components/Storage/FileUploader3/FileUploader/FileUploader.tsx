import * as React from 'react';

import { Container } from './Container';
import { DropZone } from '../DropZone';
import { defaultFileUploaderDisplayText } from '../displayText';
import { FileList } from '../FileList/FileList';
import { StorageFiles, FileState } from '../types';
import { FileUploaderProps } from './types';

function FileUploader({
  acceptedFileTypes, // passed directly to file input && to limit uploads
  accessLevel, // used on upload
  displayText: overrideDisplayText, // UI only
  isResumable, // used on upload / determines if edit is shown
  maxFileCount, // used on upload
  maxFileSize, // used on add file to set error
  onError, // customer handler to fire on error
  onSuccess, // customer handler to fire on success
  shouldAutoUpload, // used on upload
  showThumbnails, //
}: FileUploaderProps) {
  // const { uploads, addFiles } = useFileUploader();
  // const [files, setFiles] =
  const {
    dropFilesText,
    browseFilesText,
    getErrorText,
    getFilesUploadedText,
    clearButtonText,
    getRemainingFilesText,
    getUploadingText,
    getMaxFilesErrorText,
    doneButtonText,
    getPausedText,
    pauseText,
    resumeText,
    extensionNotAllowedText,
    uploadSuccessfulText,
    getUploadButtonText,
  } = {
    ...defaultFileUploaderDisplayText,
    ...overrideDisplayText,
  };

  // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files || event.target.files.length === 0) {
  //     return;
  //   }
  //   //check max file size and return

  //   const { files } = event.target;
  //   // Spread files here because a I need a File[] instead, it's easier to iterate through
  //   const addedFilesLength = addFiles([...files]); // @TODO

  // };

  const files: StorageFiles = [
    {
      id: '1',
      // @ts-expect-error
      file: {},
      isImage: true,
      name: 'file 1.gif',
      progress: 0,
      status: FileState.INIT,
      task: null,
    },
    {
      id: '2',
      // @ts-expect-error
      file: {},
      isImage: true,
      name: 'file 2.jpg',
      progress: 0,
      status: FileState.INIT,
      task: null,
    },
  ];

  return (
    <FileUploader.Container>
      <FileUploader.DropZone
        dropFilesText={dropFilesText}
        onChange={(file) => console.log('dropped!', file)}
        browseFilesText={browseFilesText}
      />
      <FileUploader.FileList
        extensionNotAllowedText={extensionNotAllowedText}
        files={files}
        getPausedText={getPausedText}
        getUploadingText={getUploadingText}
        isResumable={isResumable}
        pauseText={pauseText}
        resumeText={resumeText}
        showThumbnails={showThumbnails}
        uploadSuccessfulText={uploadSuccessfulText}
      />
    </FileUploader.Container>
  );
}

FileUploader.Container = Container;
FileUploader.DropZone = DropZone;
FileUploader.FileList = FileList;

export { FileUploader };
