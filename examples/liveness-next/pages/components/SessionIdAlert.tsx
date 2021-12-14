import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert, Button, IconContentCopy } from '@aws-amplify/ui-react';

export const SessionIdAlert = ({ sessionId }) => {
  return (
    <Alert style={{ marginBottom: '1rem' }}>
      SessionId: <strong>{sessionId}</strong>
      <CopyToClipboard text={sessionId}>
        <Button size="small" style={{ marginLeft: '0.5rem' }}>
          <IconContentCopy />
        </Button>
      </CopyToClipboard>
    </Alert>
  );
};
