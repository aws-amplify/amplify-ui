import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';

export function CustomizationCdn() {
  const [showLiveness, setShowLiveness] = React.useState(false);
  React.useEffect(() => {
    setShowLiveness(true);
  }, []);
  return showLiveness ? (
    <FaceLivenessDetector
      sessionId={'sessionId'}
      region="us-east-1"
      onAnalysisComplete={async () => {}}
      config={{
        binaryPath: 'http://example.com/path/to/your/wasm/files/',
        faceModelUrl:
          'http://example.com/path/to/your/blazeface/file/model.json',
      }}
    />
  ) : null;
}
