import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';

export function CustomizationCdn() {
  return (
    <FaceLivenessDetector
      sessionId={'sessionId'}
      region="us-east-1"
      onAnalysisComplete={async () => {}}
      config={{
        binaryPath: 'http://example.com/path/to/your/wasm/file/',
        faceModelUrl:
          'http://example.com/path/to/your/blazeface/file/model.json',
      }}
    />
  );
}
