/** File Previewer */

import React from 'react';
import { Button, Card } from '../../../../primitives';

export function Previewer(): JSX.Element {
  function upload() {
    // stubbed
  }

  return (
    <Card data-amplify-file-previewer>
      <Button onClick={upload}>Upload Files</Button>
    </Card>
  );
}
