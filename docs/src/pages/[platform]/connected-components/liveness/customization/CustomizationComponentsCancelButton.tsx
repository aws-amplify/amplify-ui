import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Button } from '@aws-amplify/ui-react';

// Hide the cancel button, for example when the host modal has its own close
// button. Closing the modal unmounts the component, which ends the session.
export function CustomizationComponentsHideCancelButton() {
  return (
    <FaceLivenessDetector
      sessionId="sessionId"
      region="us-east-1"
      onAnalysisComplete={async () => {}}
      components={{ CancelButton: null }}
    />
  );
}

// Replace the cancel button, for example to confirm before cancelling.
export function CustomizationComponentsCustomCancelButton() {
  return (
    <FaceLivenessDetector
      sessionId="sessionId"
      region="us-east-1"
      onAnalysisComplete={async () => {}}
      components={{
        CancelButton: ({ onCancel, cancelLivenessCheckText }) => (
          <Button
            size="small"
            aria-label={cancelLivenessCheckText}
            onClick={() => {
              if (window.confirm('Leave the video check?')) onCancel();
            }}
          >
            Leave check
          </Button>
        ),
      }}
    />
  );
}
