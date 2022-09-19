import isEmpty from 'lodash/isEmpty';
import React, { useMemo, useState } from 'react';
import { SetFileType } from '../../FileUploader/types';
import { DropZoneInterface } from '../../FileUploader/types';

interface FileContextInterface {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
  files?: SetFileType;
  setFiles?: React.Dispatch<React.SetStateAction<SetFileType>>;
  inDropZone?: boolean;
  setInDropZone?: React.Dispatch<React.SetStateAction<boolean>>;
  getDropEvents?: DropZoneInterface;
}

export const FileUploaderContext: React.Context<FileContextInterface> =
  React.createContext({});

export const Provider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const parentProviderVal = React.useContext(FileUploaderContext);
  const [showPreviewer, setShowPreviewer] = useState(false);
  const [files, setFiles] = useState<SetFileType>();

  const [inDropZone, setInDropZone] = useState(false);

  const getDropEvents = useMemo(() => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.clearData();
    };
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setInDropZone(false);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setInDropZone(true);
      e.dataTransfer.dropEffect = 'copy';
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const files = [...e.dataTransfer.files];
      if (files && files.length > 0) {
        setFiles(files);
        setShowPreviewer(true);
      }
      setInDropZone(false);
    };

    return {
      onDragStart: handleDragStart,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onDragOver: handleDragOver,
    };
  }, []);

  const value = React.useMemo(
    () =>
      isEmpty(parentProviderVal)
        ? {
            showPreviewer,
            setShowPreviewer,
            files,
            setFiles,
            getDropEvents,
            inDropZone,
            setInDropZone,
          }
        : parentProviderVal,
    [
      parentProviderVal,
      showPreviewer,
      setShowPreviewer,
      files,
      setFiles,
      getDropEvents,
      inDropZone,
      setInDropZone,
    ]
  );

  return (
    <FileUploaderContext.Provider value={value}>
      {children}
    </FileUploaderContext.Provider>
  );
};

export const useFileUploader = (): FileContextInterface => {
  const service: FileContextInterface = React.useContext(FileUploaderContext);

  if (!service) {
    throw new Error(
      'Please ensure you wrap your App with `FileUploader.Provider`.\nSee the `useAuthenticator` section on https://ui.docs.amplify.aws/connected-components/authenticator.'
    );
  }

  return service;
};
