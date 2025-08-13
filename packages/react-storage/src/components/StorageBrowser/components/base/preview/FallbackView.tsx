import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { useAction } from '../../../useAction';
import { getFileKey } from '../../../actions';

export function FallbackView({
  objectKey,
  message,
}: {
  objectKey: string;
  message: string;
}): React.JSX.Element | null {
  const [_, handleDownload] = useAction('download');

  return (
    <div>
      <div> {message}</div>
      <div>
        <Button
          onClick={() => {
            handleDownload({
              data: {
                fileKey: getFileKey(objectKey),
                key: objectKey,
                id: crypto.randomUUID(),
              },
            });
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
