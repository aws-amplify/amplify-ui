/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FileUploaderProps, SetFileType } from './types';
import { FileUploaderButton } from '../FileUploaderButton';
import { FilePreviewer } from '../FilePreviewer';
import { View } from 'src/primitives';
import { CustomComponentsContext, useCustomComponents } from '../hooks/';
import { defaultComponents } from '../hooks/defaultComponents';
import { FileUploaderDrop } from '../FileUploaderDrop';
import { Provider, useFileUploader } from '../hooks/useFileUploader';

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/storage)
 */

export function FileUploader({
  accept,
  fileName,
  level,
  components: customComponents,
  maxFiles,
  maxMultipleSize,
  maxSize,
  multiple = true,
  onChange,
  onError,
  onSuccess,
  path,
  showPreview = false,
  variation = 'button',
}: FileUploaderProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('file', FileUploaderDrop);

  function Router(): JSX.Element {
    const { FileUploaderDrop = Router.FileUploaderDrop } =
      useCustomComponents();
    const { showPreviewer } = useFileUploader();
    const commonProps = {
      accept,
      fileName,
      multiple,
    };
    if (showPreviewer) {
      return <FilePreviewer fileName={fileName} level={level} />;
    } else if (variation === 'button') {
      return <FileUploaderButton {...commonProps} />;
    } else {
      return (
        <FileUploaderDrop {...commonProps}>
          <FileUploaderButton {...commonProps} />
          <View as="span">or drag file{multiple ? 's' : ''} here</View>
        </FileUploaderDrop>
      );
    }
  }

  Router.FileUploaderDrop = FileUploaderDrop;

  const value = React.useMemo(
    () => ({ ...defaultComponents, ...customComponents }),
    [customComponents]
  );

  return (
    <Provider>
      <CustomComponentsContext.Provider value={value}>
        <Router />
      </CustomComponentsContext.Provider>
    </Provider>
  );
}

FileUploader.Provider = Provider;
