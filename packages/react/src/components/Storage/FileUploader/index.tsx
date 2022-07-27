import React from 'react';

interface FileUploaderProps {
  multiple?: boolean;
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function FileUploader(props: FileUploaderProps): JSX.Element {
  const { multiple } = props;

  // eslint-disable-next-line no-console
  console.log('he', multiple);
  return <h1>Hello World123</h1>;
}
