import { useState } from 'react';
import {
  LivenessFlow,
  LivenessFlowProps,
  LivenessStatus,
} from '@aws-amplify/ui-react';
import { Amplify, API } from 'aws-amplify';
import useSWR from 'swr';
import awsExports from '@environments/liveness/src/aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: 'SampleBackend',
        endpoint: 'https://zoi5y67js7.execute-api.us-west-2.amazonaws.com/prod',
        region: 'us-west-2',
      },
    ],
  },
});

export default function App() {
  const [isLivenessActive, setLivenessActive] = useState(false);

  const {
    data: startLivenessApiData,
    error: startLivenessApiError,
    isValidating: startLivenessApiLoading,
  } = useSWR(
    'StartLiveness',
    () => API.post('SampleBackend', '/liveness/start', {}),
    { revalidateOnFocus: false }
  );

  const handleStartLiveness = () => {
    setLivenessActive(true);
  };

  const handleExit = () => {
    setLivenessActive(false);
  };

  const handleUserExit = (event: CustomEvent) => {
    event.preventDefault();
    setLivenessActive(false);
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLivenessActive(false);
  };

  const handleGetLivenessDetection: LivenessFlowProps['onGetLivenessDetection'] =
    async (sessionId) => {
      let response;
      // TODO: remove try/catch and return response
      try {
        response = await API.get('SampleBackend', `/liveness/${sessionId}`, {});
        console.log({ response });
      } catch (err) {
        console.log({ err });
      }

      return { isLive: LivenessStatus.SUCCESS };
    };

  if (startLivenessApiError) {
    return <div>Some error occured...</div>;
  }

  return (
    <div>
      {isLivenessActive ? (
        <LivenessFlow
          sessionId={startLivenessApiData.sessionId}
          clientActionDocument={startLivenessApiData.clientActionDocument}
          onGetLivenessDetection={handleGetLivenessDetection}
          active={isLivenessActive}
          onExit={handleExit}
          onUserCancel={handleUserExit}
          onSuccess={handleSuccess}
        />
      ) : (
        <button
          id="StartButton"
          onClick={handleStartLiveness}
          disabled={startLivenessApiLoading}
        >
          {startLivenessApiLoading ? 'Loading...' : 'Start Liveness'}
        </button>
      )}
    </div>
  );
}
