import { useState } from 'react';
import { LivenessFlow } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/src/aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  ...awsExports,
});

export default function App() {
  const [isLivenessVisible, setLivenessVisible] = useState(false);

  const handleStartLiveness = () => {
    setLivenessVisible(true);
  };

  const handleUserExit = () => {
    setLivenessVisible(false);
  };

  return (
    <div>
      {isLivenessVisible ? (
        <LivenessFlow
          sessionId="sessionId"
          livenessSeed="livenessSeed"
          onUserExit={handleUserExit}
        />
      ) : (
        <button id="StartButton" onClick={handleStartLiveness}>
          Start Liveness
        </button>
      )}
    </div>
  );
}
