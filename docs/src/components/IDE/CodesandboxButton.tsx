import { Button } from '@aws-amplify/ui-react';
import * as React from 'react';
import { generateCRA } from './generateCRA';

function openCodeSandbox({ code, title = 'Example' }) {
  const { indexHTML, indexJS, packageJSON } = generateCRA({ title });

  return fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      files: {
        'public/index.html': {
          isBinary: false,
          content: indexHTML,
        },
        'index.jsx': {
          isBinary: false,
          content: indexJS,
        },
        'Example.jsx': {
          isBinary: false,
          content: code,
        },
        'package.json': {
          content: packageJSON,
          isBinary: false,
        },
      },
    }),
  })
    .then((x) => x.json())
    .then((data) => {
      window.open(`https://codesandbox.io/s/${data.sandbox_id}`, '_blank');
    });
}

export const CodesandboxButton = ({ code, title = 'example', ...rest }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleCodeSandbox = () => {
    setIsLoading(true);
    openCodeSandbox({ code, title }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <Button
      variation="link"
      {...rest}
      isLoading={isLoading}
      onClick={handleCodeSandbox}
    >
      Codesandbox
    </Button>
  );
};
