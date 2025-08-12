import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { useAction } from '../../../useAction';
import { getFileKey } from '../../../actions';

export function UnsupportedView({
  objectKey,
}: {
  objectKey: string;
}): React.JSX.Element | null {
  const [_, handleDownload] = useAction('download');

  return (
    <div>
      <div> File preview not supported </div>;
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
