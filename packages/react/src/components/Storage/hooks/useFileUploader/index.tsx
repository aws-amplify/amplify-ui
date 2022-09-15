import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';

interface FileContextInterface {
  showPreviewer?: boolean;
  setShowPreviewer?: React.Dispatch<React.SetStateAction<boolean>>;
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

  const value = React.useMemo(
    () =>
      isEmpty(parentProviderVal)
        ? { showPreviewer, setShowPreviewer }
        : parentProviderVal,
    [parentProviderVal, showPreviewer, setShowPreviewer]
  );
  // eslint-disable-next-line no-console
  console.log('creating provider', isEmpty(parentProviderVal));

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
      'Please ensure you wrap your App with `Authenticator.Provider`.\nSee the `useAuthenticator` section on https://ui.docs.amplify.aws/connected-components/authenticator.'
    );
  }

  return service;
};
